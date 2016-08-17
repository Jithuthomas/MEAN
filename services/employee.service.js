var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('employee');
db.bind('counters');

var service = {};


service.getAllEmployeeByCompanyId = getAllEmployeeByCompanyId;
service.getEmployeeDetailsById = getEmployeeDetailsById;
service.updateEmployee = updateEmployee;
service.deleteEmployee = deleteEmployee;
service.createEmp = createEmp;

function deleteEmployee(_id) {
    var deferred = Q.defer();

    db.employee.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getAllEmployeeByCompanyId(cmpyID){
    var cid = parseInt(cmpyID);
    var deferred = Q.defer();
    db.employee.find({cmpyid: cid}).toArray(function (err, employee) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (employee) {
            // return user (without hashed password)
            deferred.resolve(_.omit(employee, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise; 
}

function getEmployeeDetailsById(empID){
    var eid = parseInt(empID);
    var deferred = Q.defer();
    db.employee.find({id:eid}).toArray(function (err, employee) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (employee) {
            // return user (without hashed password)
            deferred.resolve(_.omit(employee, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise; 
}


function updateEmployee(_id, empParam) {
        // fields to update
     var deferred = Q.defer();
        var set = {
            name: empParam.name,
            designation: empParam.designation,
            cmpyid: parseInt(empParam.cmpyid)
        };


        db.employee.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    return deferred.promise;
    }


    function createEmp(empParam) {
        var deferred = Q.defer();
       getNextSequenceValue('companyid');
        db.counters.find({_id: 'companyid'}).toArray(function (err, result) {
        empParam[0].id = result[0].sequence_value;
         // insert to db
            db.employee.insert(
            empParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
            
        });

        return deferred.promise;
    }


 function getNextSequenceValue(name) {
   db.counters.update( { _id: name },{ $inc: { sequence_value: 1 }});
} 



    



    

module.exports = service;

