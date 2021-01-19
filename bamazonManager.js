var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password123",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayMenu();
});

function displayMenu() {
    console.log("");
    inquirer
        .prompt(
            {
                type: "list",
                name: "userChoice",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
            }
        )
        .then(function (answer) {
            switch (answer.userChoice) {
                case "View Products for Sale":
                    displayAllItems();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addStockQty();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "Quit":
                    connection.end();
                    break;
            }
        });
};

function displayAllItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("");
        var values = [];
        for (var i = 0; i < res.length; i++) {
            var row = [
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                parseFloat(res[i].price).toFixed(2),
                res[i].stock_quantity,
                parseFloat(res[i].product_sales).toFixed(2)
            ];
            values.push(row);
        };
        console.table(['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales'], values);
        console.log("");
        if (err) throw err;
        displayMenu();
    });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        console.log("");
        var values = [];
        for (var i = 0; i < res.length; i++) {
            var row = [
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                parseFloat(res[i].price).toFixed(2),
                res[i].stock_quantity,
                parseFloat(res[i].product_sales).toFixed(2)
            ];
            values.push(row);
        };
        console.table(['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales'], values);
        console.log("");
        if (err) throw err;
        displayMenu();
    });
};

function addStockQty() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                // request restock
                {
                    name: "restockItemId",
                    type: "input",
                    message: "Which item_id would you like to restock?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "restockQty",
                    type: "input",
                    message: "How many would you like to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem = 0;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.restockItemId)) {
                        chosenItem = results[i];
                    }
                };
                // restock inventory
                var stockQty = chosenItem.stock_quantity;
                var restockQty = parseInt(answer.restockQty);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockQty + restockQty
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("----------------------------------------------");
                        console.log("Added inventory successfully!");
                        console.log("----------------------------------------------");
                        console.log("");
                        displayMenu();
                    }
                );
            });
    });
};

function addNewProduct() {
    // prompt for info about new product
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "What is the product name?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What department is this product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is it's price?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How much inventory do you have?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity,
                    product_sales: 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("New product was added successfully!");
                    displayMenu();
                }
            );
        });
};
