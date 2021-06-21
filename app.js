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

function start() {
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
      if (answer.options === "Update Employee Role") {
        update_employee_role();
      }
      if (answer.options === "Exit") {
        connection.end();
      }
    });
}

//create function to view employees- JOIN dept role employee and employees
function view_employees() {
  connection.query(
    `SELECT e.id,e.first_name,e.last_name,deptName,title,salary, CONCAT(m.first_name, " ",  m.last_name)AS manager FROM department RIGHT JOIN role ON department.id = role.department_id 
RIGHT JOIN employee e ON e.role_id = role.id
LEFT JOIN employee m ON m.id = e.manager_id`,
    function (err, data) {
      console.table(data);
      start();
    }
  );
}

//create function to view departments
function view_departments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    start();
  });
}

//create a function to view all roles- JOIN dept and roles
function view_roles() {
  connection.query(
    "SELECT role.id,deptName,title,salary FROM department RIGHT JOIN role ON department.id = role.department_id",
    function (err, data) {
      console.table(data);
      start();
    }
  );
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
        type: "list",
        name: "roleId",
        message: "What is the role id of the new employee?",
        choices: [1, 2, 3, 4, 5], //add choices for the role id's
      },
      {
        type: "list",
        name: "managerId",
        message: "What is the manager id of the new employee?",
        choices: [1, 2], //add choices that = arrays from the select statements from the database SELECT * FROM employee
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
  //connection.query
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of that role?",
      },
      {
        type: "list",
        name: "deptId",
        message: "What is the department id for that role?",
        choices: [1, 2, 3, 4, 5, 6, 7], //use select statement
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.deptId,
        },
        (err) => {
          if (err) throw err;
          console.log("New Role Successfully Added!");
          start();
        }
      );
    });
}
//create a function to update employee roles-// need a list of employees and list of roles
function update_employee_role() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "What is the name of the employee?",
        choices: ["Barbara ", "Emily", "Michael", "Emma", "Luis"],
      },
      {
        type: "list",
        name: "role",
        message: "what is the new role id for that employee?",
        choices: [1, 2, 3, 4, 5],
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET role_id = ?",
        {
          first_name: answer.employee,
          role_id: answer.role,
        },
        (err) => {
          if (err) throw err;
          console.log("New Role Successfully Added!");
          start();
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
  employee_tracker();
  // run the start function after the connection is made
});
function employee_tracker() {
  const figlet = require("figlet");

  figlet("Employee Tracker", function (err, data) {
    console.log(data);

    start();
  });
}
