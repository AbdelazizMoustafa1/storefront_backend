
CREATE TABLE ordersProducts(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    products_id INTEGER REFERENCES products(id) NOT NULL
);
