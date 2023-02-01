import express, { Request, Response } from 'express';
import authenticater from '../middleware/authentication';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(404).json((err as Error).message);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const qty: number = parseInt(req.body.quantity);
    const oId: number = parseInt(req.params.id);
    const pId: number = parseInt(req.body.product_id);

    const addedProduct = await store.addProduct(qty, oId, pId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const addedProduct = await store.getUserOrders(userId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const setOrderStatus = async (req: Request, res: Response) => {
  try {
    const oId: number = parseInt(req.params.id);
    const status: string = req.body.status;

    const order = await store.setOrderStatus(oId, status);
    res.json(order);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const orders_routes = (app: express.Application): void => {
  app.post('/orders', authenticater, create);
  app.post('/orders/:id', authenticater, addProduct);
  app.get('/users/:id/orders', getUserOrders);
  app.patch('/orders/:id', setOrderStatus);
};

export default orders_routes;
