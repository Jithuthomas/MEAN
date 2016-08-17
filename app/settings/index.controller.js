(function () {
    'use strict';

    angular
        .module('app')
        .controller('Settings.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.employee = null;
       vm.submitEmp = submitEmp;

        initController();
        
        function initController() {
        UserService.GetAllCompany().then(function (company) {
                vm.company = company;
                vm.employee = [{id: null, name:null, designation:null, cmpyid:null}];
            });
        }

        function submitEmp() {
            // set all employee details
            var value = document.getElementById("choice").value;
            vm.employee.cmpyid = parseInt(value);
            var employee = [{id: null, name:vm.employee.name, designation:vm.employee.designation, cmpyid:vm.employee.cmpyid}];
            UserService.submitEmp(employee).then(function (employee_res) {
            FlashService.Success('Employee Added');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

    }

})();