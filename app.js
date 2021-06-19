const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//create connection to mysql
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  //add user/password and database
  user: "root",
  password: "Bootcamp!2021",
  database: "employee_trackerDB",
});

//create function to start inquirer application

const start = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "options",
      choices: [
        "View all Employees",
        "View Departments",
        "View all Roles",
        "Add an Employee",
        "Add a new Department",
        "Add a Role",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      if (answer.options === "View all Employees") {
        view_employees();
      }
      if (answer.options === "View Departments") {
        view_departments();
      }
      if (answer.options === "View all Roles") {
        view_roles();
      }
      if (answer.options === "Add an Employee") {
        add_employee();
      }
      if (answer.options === "Add a new Department") {
        add_department();
      }
      if (answer.options === "Add a Role") {
        add_role();
      }
      if (answer.options === "Update employee roles") {
        update_employee_roles();
      }
      if (answer.options === "Exit") {
        connection.end();
      }
    });
};

//create function to view employees
function view_employees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    start();
  });
}

//create function to view departments
function view_departments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    start();
  });
}

//create a function to view all roles
function view_roles() {
  connection.query("SELECT * FROM role", function (err, data) {
    console.table(data);
    start();
  });
}

// create a function to add employee
function add_employee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message:
          "What is the first name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "lastName",
        message:
          "What is the last name of the employee you would like to add? ",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the role id of the new employee?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager id of the new employee?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        (err) => {
          if (err) throw err;
          console.log("New Employee Successfully Added!");
          start();
        }
      );
    });
}

//create a function to add departments
function add_department() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Which department would you like to add?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          deptName: answer.addDepartment,
        },
        (err) => {
          if (err) throw err;
          console.log("New Department Successfully Added!");
          start();
        }
      );
    });
}
//create a function to add roles
function add_role() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "Which role would you like to add?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET role",
        {
          role_id: answer.addRole,
        },
        (err) => {
          if (err) throw err;
          console.log("New Role Successfully Added!");
        }
      );
    });
}
//create a function to update employee roles-
function update_employee_roles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "updateRole",
        message: "Which employee's role would you like to update?",
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET role = ? WHERE id =?",
        {
          role_id: answer.updateRole,
        },
        (err) => {
          if (err) throw err;
          console.log("New Role Successfully Added!");
        }
      );
    });
}

//connect to mysql server and database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected as id" + connection.threadId);
  // run the start function after the connection is made
  start();
});
