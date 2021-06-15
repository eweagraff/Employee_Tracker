INSERT INTO department (name, id)
VALUES 
("Human Resources", 1),
("Sales", 2),
("Finance", 3),
("Engineering", 4),
("Customer Relations", 5),
("IT", 6);

INSERT INTO role (title, salary, department_id)
VALUES
("Engineer", 100000, 1),
("HR Rep", 75000, 2),
("Accountant", 90000, 3),
("Computer Technician", 100000, 4),
("Customer Service Rep", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Emily", "Weagraff", 1, 2),
("Michael", "Lepiere", 2, 4),
("Barbara", "Collins", 2, 4),
("Luis", "Angeles", 3, 2),

