(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetAllCompany = GetAllCompany;
        service.getAllEmployeeByCompanyId = getAllEmployeeByCompanyId;
        service.getEmpDetailsById = getEmpDetailsById;
        service.UpdateEmp = UpdateEmp;
        service.DeleteEmp = DeleteEmp;
        service.submitEmp = submitEmp;

        return service;

        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }
        
         function GetAllCompany() {
            return $http.get('/api/users/company').then(handleSuccess, handleError);
        }
        
        function getAllEmployeeByCompanyId(id) {    
            return $http.get('/api/users/showemployee/' + id).then(handleSuccess, handleError);
        }
        
       function getEmpDetailsById(id) {
           return $http.get('/api/users/showempdetails/' + id).then(handleSuccess, handleError);
       }
        function UpdateEmp(emp) {
            return $http.put('/api/users/updateemp/' + emp._id, emp).then(handleSuccess, handleError);
        }
         function DeleteEmp(_id) {
            return $http.delete('/api/users/deleteemp/' + _id).then(handleSuccess, handleError);
        }
         function submitEmp(employee) {
             console.log(employee);
            return $http.post('/api/users/submitemp',employee).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
