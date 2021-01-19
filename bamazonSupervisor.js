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
                choices: ["View Products Sales by Department", "Create New Department", "Quit"]
            }
        )
        .then(function (answer) {
            switch (answer.userChoice) {
                case "View Products Sales by Department":
                    salesByDept();
                    break;

                case "Create New Department":
                    createDept();
                    break;

                case "Quit":
                    connection.end();
                    break;
            }
        });
};

function salesByDept() {
    var query = "SELECT d.*, sum(p.product_sales), (p.product_sales-d.over_head_costs) as total_profit ";
    query += "FROM departments d LEFT JOIN products p ON d.department_name = p.department_name ";
    query += "GROUP BY d.department_name, d.over_head_costs";

    connection.query(query, function (err, res) {
        console.log("");
        var values = [];
        for (var i = 0; i < res.length; i++) {
            var row = [
                res[i].department_id,
                res[i].department_name,
                res[i].over_head_costs,
                res[i].product_sales,
                res[i].total_profit
            ];
            values.push(row);
        };
        console.table(['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'], values);
        console.log("");
        if (err) throw err;
        displayMenu();
    });
}

function createDept() {
    // prompt for info about new dept
    inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "What is the department name?"
            },
            {
                name: "over_head_costs",
                type: "input",
                message: "What are the overhead costs?",
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
                "INSERT INTO departments SET ?",
                {
                    department_name: answer.department_name,
                    over_head_costs: answer.over_head_costs
                },
                function (err) {
                    if (err) throw err;
                    console.log("New department was added successfully!");
                    displayMenu();
                }
            );
        });
};