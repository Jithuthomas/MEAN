var config = require('config.json');
var express = require('express');
var router = express.Router();
var companyService = require('services/company.service');
var userService = require('services/user.service');
var employeeService = require('services/employee.service');


// routes
router.post('/submitemp',CreateEmployee);
router.delete('/deleteemp/:_id',deleteEmployee);
router.put('/updateemp/:_id',updateEmployee);
router.get('/showempdetails/:id',showemployeedetails);
router.get('/showemployee/:id',showemployeebycompany);
router.get('/company', getComapnyNames);
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;

function CreateEmployee(req, res) {
    employeeService.createEmp(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteEmployee(req, res) {
    var empId = req.params._id;

    employeeService.deleteEmployee(empId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateEmployee(req, res) {
    var empId = req.params._id;
    if (!req.params._id) {
        return res.status(401).send('You cannot update your account');
    }

    employeeService.updateEmployee(empId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function showemployeedetails(req, res){
    var empId = req.params.id;
   employeeService.getEmployeeDetailsById(empId)
     .then(function (employee) {
            if (employee) {
                res.send(employee);
                
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 
}

function showemployeebycompany(req, res){
    var cmpyId = req.params.id;
   employeeService.getAllEmployeeByCompanyId(cmpyId)
     .then(function (employee) {
            if (employee) {
                res.send(employee);
                
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 
}

function getComapnyNames(req, res){
    //console.log(companyService);
   // res.json(companyService.getAllComapnyName());
    companyService.getAllComapnyName()
     .then(function (user) {
            if (user) {
                res.send(user);
                
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 
}

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}