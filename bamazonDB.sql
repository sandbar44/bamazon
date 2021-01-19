DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE products;
CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INTEGER NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Playing Cards", "Toys & Games", 5, 525, 15000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sequence Game", "Toys & Games", 24.99, 485, 60000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Cards Against Humanity", "Toys & Games", 25, 112, 25000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Smart Home Camera", "Camera & Photo", 25.98, 34, 13000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Outdoor Security Camera", "Camera & Photo", 39.98, 87, 150000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Baby Monitor", "Camera & Photo", 49.99, 165, 204000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("1984 by George Orwell", "Books", 17.89, 24, 12000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bridgerton The Duke & I", "Books", 13.22, 89, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Ender Quartet Boxed Set", "Books", 34.96, 51, 12000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Reusable Face Mask", "Clothing", 6.99, 846, 9000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Women's Yoga Pants", "Clothing", 29.99, 65, 11000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Lover by Taylor Swift", "Music", 19.99, 99, 19000);

SELECT * FROM products;

///////////////////////////////////////////////////////////////////////////////////-- 

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

SELECT d.*, sum(p.product_sales) as product_sales, (sum(p.product_sales)-d.over_head_costs) as total_profit
FROM departments d LEFT JOIN products p ON d.department_name = p.department_name
GROUP BY d.department_name,d.over_head_costs;