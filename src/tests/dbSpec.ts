import { User, UserStore } from '../models/user';
import { Order, OrderProduct, OrderStore } from '../models/order';
import { Product, ProductStore } from '../models/product';

import client from '../database';
const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

const newUser: User = {
    user_name: 'sample1',
    password: 'sample2',
    first_name: 'sample',
    last_name: 'sampl'
};
const addedUser: User = { ...newUser, id: 1 };

const newProduct: Product = {
  name: 'sample fancy product',
  price: 2
};
const addedProduct: Product = { ...newProduct, id: 1 };

const newOrder: Order = {
  status: 'active',
  user_id: 1
};
const addedOrder: Order = { ...newOrder, id: 1 };

const newOrderProduct: OrderProduct = {
  quantity: 5,
  order_id: addedOrder.id as number,
  product_id: addedProduct.id as number
};

describe('A Model For A User', () => {
  beforeAll((): void => {
    console.log('before all A User');
  });

  it('tests the create method of the class', () => {
    expect(userStore.create).toBeDefined();
  });
  
  it('tests adding a user using the create method', async () => {
    const output = await userStore.create(newUser);
    expect(output.id).toEqual(addedUser.id);
    expect(output.user_name).toEqual(addedUser.user_name);
    expect(output.first_name).toEqual(addedUser.first_name);
    expect(output.last_name).toEqual(addedUser.last_name);
  });

  it('tests the authentication', () => {
    expect(userStore.authenticate).toBeDefined();
  });

  it('checks the authenticate method for a correct user', async () => {
    const output = (await userStore.authenticate(
      newUser.user_name,
      newUser.password
    )) as User;
    expect(output.id).toEqual(addedUser.id);
    expect(output.user_name).toEqual(addedUser.user_name);
    expect(output.first_name).toEqual(addedUser.first_name);
    expect(output.last_name).toEqual(addedUser.last_name);
  });
});

describe('A Model For A Product', () => {
  beforeAll((): void => {
    console.log('before all A Product');
  });

  it('tests index presence', () => {
    expect(productStore.index).toBeDefined();
  });

  it('tests index functionality, showing a list of products', async () => {
    const output = await productStore.index();
    expect(output[0].id).toEqual(addedProduct.id);
    expect(output[0].name).toEqual(addedProduct.name);
    expect(output[0].price).toEqual(addedProduct.price);
  });

  it('tests show presence', () => {
    expect(productStore.show).toBeDefined();
  });

  it('tests show functionality, showing the product with id', async () => {
    const output = await productStore.show('1');
    expect(output.id).toEqual(addedProduct.id);
    expect(output.name).toEqual(addedProduct.name);
    expect(output.price).toEqual(addedProduct.price);
  });
  

  it('tests create presence', () => {
    expect(productStore.create).toBeDefined();
  });

  it('tests create functionality, creating a product', async () => {
    const output = await productStore.create(newProduct);
    expect(output.id).toEqual(addedProduct.id);
    expect(output.name).toEqual(addedProduct.name);
    expect(output.price).toEqual(addedProduct.price);
  });  
});

describe('A Model For An Order', () => {
  beforeAll(async () => {
    console.log('before all An Order');
    const conn = await client.connect();

    const sql = `DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
    DELETE FROM products;
    ALTER SEQUENCE products_id_seq RESTART WITH 1;`;

    await conn.query(sql);
    await userStore.create(newUser);
    await productStore.create(newProduct);

    conn.release();
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users; DELETE FROM products;`;
    await conn.query(sql);
    conn.release();
  });

  it('should have a create and other following methods', () => {
    expect(orderStore.create).toBeDefined();
    expect(orderStore.addProduct).toBeDefined();
    expect(orderStore.getUserOrders).toBeDefined();
    expect(orderStore.setOrderStatus).toBeDefined();
  });

  it('tests creating an order', async () => {
    const output = await orderStore.create(newOrder);
    expect(output.id).toEqual(addedOrder.id);
    expect(output.user_id).toEqual(addedOrder.user_id);
    expect(output.status).toEqual(addedOrder.status);
  });

  it('tests the getUserOrders method functionality, returning a list of orders for this user', async () => {
    const output = await orderStore.getUserOrders(addedUser.id as number);

    expect(output[0].id).toEqual(addedOrder.id);
    expect(output[0].user_id).toEqual(addedOrder.user_id);
    expect(output[0].status).toEqual(addedOrder.status);
  });

});
