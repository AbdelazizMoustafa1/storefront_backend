import express, { Request, Response } from 'express';
import authenticater from '../middleware/authentication';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  if (!product) {
    res.status(404).json('Please provide a valid id');
  }
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };
    // const {name, price} = req.body
    // const product:Product = {name, price}

    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const products_routes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', authenticater, create);
};

export default products_routes;
