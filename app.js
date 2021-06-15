const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//create connection to mysql
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",
  password: "Bootcamp!2021",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected as id" + connection.threadId);
  employee_tracker();
});
