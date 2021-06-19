USE employee_trackerDB;


INSERT INTO department (deptName)
VALUES 
("Human Resources"),
("Sales"),
("Finance"),
("Engineering"),
("Customer Relations"),
("IT");

INSERT INTO role (title, salary, department_id)
VALUES
("Engineer", 100000, 4),
("HR Rep", 75000, 1),
("Accountant", 90000, 3),
("Computer Technician", 100000, 4),
("Customer Service Rep", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Emily", "Weagraff", 1, 2),
("Michael", "Lepiere", 2, null),
("Barbara", "Collins", 2, null),
("Luis", "Angeles", 3, 3);

