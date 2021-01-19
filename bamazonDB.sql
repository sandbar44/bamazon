DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INTEGER NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playing Cards", "Toys & Games", 5, 525);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sequence Game", "Toys & Games", 24.99, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "Toys & Games", 25, 204);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart Home Camera", "Camera & Photo", 25.98, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Outdoor Security Camera", "Camera & Photo", 39.98, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baby Monitor", "Camera & Photo", 49.99, 165);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1984 by George Orwell", "Books", 17.89, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bridgerton The Duke & I", "Books", 13.22, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Ender Quartet Boxed Set", "Books", 34.96, 51);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Reusable Face Mask", "Clothing", 6.99, 846);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Yoga Pants", "Clothing", 29.99, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lover by Taylor Swift", "Music", 19.99, 99);

SELECT * FROM products;

DROP TABLE departments;
CREATE TABLE departments (
  department_id INTEGER AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30),
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys & Games",10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Camera & Photo",50000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books",8000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing",60000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Music",20000);

SELECT * FROM departments;

SELECT d.*, sum(p.product_sales) as product_sales, (p.product_sales-d.over_head_costs) as total_profit
FROM departments d LEFT JOIN products p ON d.department_name = p.department_name
GROUP BY d.department_name,d.over_head_costs;

ALTER TABLE products
ADD product_sales INTEGER NOT NULL;

ALTER TABLE products
MODIFY COLUMN product_sales DECIMAL(10,2) NOT NULL;
