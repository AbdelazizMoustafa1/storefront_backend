import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orders_routes from './handlers/orders';
import products_routes from './handlers/products';
import users_routes from './handlers/users';
import { Product } from './models/product';

const app: express.Application = express();
// const address: string = '0.0.0.0:3000';
const port = 3000;

app.use(bodyParser.json());

console.log('hello');
app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

orders_routes(app);
products_routes(app);
users_routes(app);

app.listen(port, () => {
  console.log(`starting app to run on port: ${port}`);
});
console.log('before all A User');
const newProduct: Product = {
  name: 'sample fancy product',
  price: 2
};
const addedProduct: Product = { ...newProduct, id: 1 };
console.log(newProduct.name, addedProduct);
export default app;
