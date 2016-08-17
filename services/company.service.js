var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('company');

var service = {};


service.getAllComapnyName = getAllComapnyName;
//service.authenticate = authenticate;
//service.getById = getById;
//service.create = create;
//service.update = update;
//service.delete = _delete;



function getAllComapnyName(){
  //  console.log('getAllComapnyName');
    var deferred = Q.defer();
    db.company.find().toArray(function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;    
}

function getAllEmployeeByCompanyId(cmpyID){
    var deferred = Q.defer();
    db.company.find().toArray(function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise; 
}


module.exports = service;

