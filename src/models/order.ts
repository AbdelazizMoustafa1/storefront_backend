import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrderStore {
  async create(b: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1,$2) RETURNING *';
      const result = await conn.query(sql, [b.user_id, b.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't add order ${b}. Error: ${(err as Error).message}`
      );
    }
  }

  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [order_id]);
      const order = result.rows[0];

      if (!(order.status == 'active')) {
        throw new Error(
          `Couldn't add product with the id: ${product_id} to order with id: ${order_id}. Please make sure the order status is 'active' and not: ${order.status}`
        );
      }
      conn.release();
    } catch (err) {
      throw new Error(
        `Couldn't add product with the id: ${product_id}. Please fix the Error: ${
          (err as Error).message
        }`
      );
    }

    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO ordersProducts (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, order_id, product_id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't add product with the id: ${product_id} to order with the id: ${order_id}. Please fix the Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async setOrderStatus(id: number, status: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
      const result = await conn.query(sql, [status, id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't update order with given id: ${id}. Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async getUserOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get orders for user with id: ${user_id}. Error: ${
          (err as Error).message
        }`
      );
    }
  }
}
