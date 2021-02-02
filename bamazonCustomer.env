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
    displayAllItems();
    newOrder();
});

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
                // parseFloat(res[i].product_sales).toFixed(2) // hide from customer
            ];
            values.push(row);
        };
        console.table(['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'], values);
        console.log("");
        if (err) throw err;
    });
}

function newOrder() {
    // query database for all items
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                // request order
                {
                    name: "orderItemId",
                    type: "input",
                    message: "Which item_id would you like to order?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "orderQty",
                    type: "input",
                    message: "How many?",
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
                    if (results[i].item_id === parseInt(answer.orderItemId)) {
                        chosenItem = results[i];
                    }
                };
                // check inventory
                var stockQty = chosenItem.stock_quantity;
                var orderQty = parseInt(answer.orderQty);
                if (stockQty < orderQty) {
                    // not enough inventory
                    console.log("----------------------------------------------");
                    console.log("Insufficient quantity! Please try again...");
                    console.log("----------------------------------------------");
                    console.log("");
                    nextAction();
                }
                else {
                    // fulfill order
                    var sales = chosenItem.product_sales + (orderQty * chosenItem.price);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty - orderQty,
                                product_sales: sales
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("----------------------------------------------");
                            console.log("Order placed successfully!");
                            console.log("Order total: $" + parseFloat(orderQty * chosenItem.price).toFixed(2));
                            console.log("----------------------------------------------");
                            console.log("");
                            nextAction();
                        }
                    );
                }
            });

    });
};

function nextAction() {
    inquirer
        .prompt(
            {
                type: "list",
                name: "nextAction",
                message: "Would you like to place another order?",
                choices: ["Yes please!", "No, I'm done!"]
            }
        )
        .then(function (answer) {
            if (answer.nextAction === "Yes please!") {
                displayAllItems();
                newOrder();
            }
            else {
                connection.end();
            }
        });
};
