# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index /products[GET]
- Show /products/:id [GET]
- Create [token required] /products [POST] body: {name, price}

#### Users
- Index [token required]
- Show [token required]
- Create (/users) [POST] N[token required] body: {user_name,first_name,last_name, password}
- Current Order by user (/users/:id/orders) [GET] (args: user id)[token required]

#### Orders
- create (/orders) [POST] body : {user_id}
- Set status (/orders/:id) PATCH [token required]
- Add product (/orders/:id) [POST] [token required] body : {products_id, quantity}
- Current Order by user (/users/:id/orders) [GET] (args: user id)[token required]

#### Authenitication
- Authenticate (\authenticate) [POST] body: [username, password]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- user_name
- first_name
- last_name
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### order products
- id
- product id
- order id
- quantity of product

## Data Schemas

#### Product

                                    Table "public.products"
 Column |          Type          | Collation | Nullable |               Default
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(100) |           | not null |
 price  | integer                |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
    "products_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE "ordersproducts" CONSTRAINT "ordersproducts_products_id_fkey" FOREIGN KEY (products_id) REFERENCES products(id)


#### User

                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 user_name  | character varying(100) |           | not null |
 first_name | character varying(100) |           | not null |
 last_name  | character varying(100) |           | not null |
 password   | character varying(100) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)


#### Orders

                               Table "public.orders"
 Column  |     Type     | Collation | Nullable |              Default
---------+--------------+-----------+----------+------------------------------------
 id      | integer      |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer      |           | not null |
 status  | order_status |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "ordersproducts" CONSTRAINT "ordersproducts_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

#### order products

                              Table "public.ordersproducts"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('ordersproducts_id_seq'::regclass)
 quantity   | integer |           | not null |
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
Indexes:
    "ordersproducts_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "ordersproducts_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "ordersproducts_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
