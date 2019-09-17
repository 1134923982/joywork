angular.module('joy_work').controller('registerCtrl',function($scope, httpManager){
    $scope.userdata = {};
    $scope.registerResult = '';
    $scope.registerCode = 0;
    $scope.radioData = ['男','女'];
    $scope.submitForm = function () {
        httpManager.create('/users/register', {'userdata': $scope.userdata}, function (response) {
            $scope.registerResult = response.data.message;
            $scope.registerCode = response.data.code;
            $scope.userdata = {};
        })
        console.log($scope.userdata);
    }
});