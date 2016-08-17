(function () {
    'use strict';

    angular
        .module('app')
        .controller('Company.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

         vm.company = null;
        vm.header = null;
         vm.showEmp = showEmp;
        vm.initController = initController;
        vm.showEmpdetails = showEmpdetails;
        vm.saveEmp = saveEmployee;
       vm.deleteEmp = deleteEmp;

        initController();

        function initController() {
            // get current user
            UserService.GetAllCompany().then(function (company) {
                vm.header = 'Company List';
                vm.company = company;
                vm.cmpydiv =true;
                vm.empdiv =false;
                vm.empdetailsdiv = false;
            });
        }
        
        function showEmp($event){
            var id = $event.target.id;
           // console.log(id);
            UserService.getAllEmployeeByCompanyId(id).then(function (employee) {
                vm.header = 'Employee List';
                vm.employee = employee;
                vm.cmpydiv =false;
                vm.empdiv =true;
                vm.empdetailsdiv = false;
                });
             
        }
        
        function showEmpdetails($event){
           var id = $event.target.id;
            UserService.getEmpDetailsById(id).then(function (empdetails) {
            UserService.GetAllCompany().then(function (company) {
                vm.company = company;
            });
                vm.header = 'Employee Details';
                vm.empdetails = empdetails;
                vm.cmpydiv =false;
                vm.empdiv =false;
                vm.empdetailsdiv = true;
            });

        }
        
        function saveEmployee(){
            var value = document.getElementById("choice").value;
            vm.empdetails[0].cmpyid = value;
            UserService.UpdateEmp(vm.empdetails[0])
                .then(function () {
                    FlashService.Success('Employee updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
        
        function deleteEmp(){
            UserService.DeleteEmp(vm.empdetails[0]._id)
                .then(function () {
                   //show employee list
                    UserService.getAllEmployeeByCompanyId(vm.empdetails[0].cmpyid).then(function (employee) {
                    vm.header = 'Employee List';
                    vm.employee = employee;
                    vm.cmpydiv =false;
                    vm.empdiv =true;
                    vm.empdetailsdiv = false;
                    });
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();