angular.module('joy_work').controller('userDataCtrl',function($scope, httpManager, $cookies, $mdDialog){


    $scope.submitForm = function () {
        httpManager.update('/users/update', {'userdata': $scope.userdata}, function (response) {
            //var userdata = JSON.parse($cookies.get('userInfo'));
            console.log($cookies.get('userInfo'))
            var userdata = JSON.parse($cookies.get('userInfo'));
            $scope.$emit('login');

        })
    }

    function checkRequireParams() {
        if ($scope.userdata.username) {
            return true;
        }
        return false;
    }

    $scope.save=function(){
        console.log('save');
        if (checkRequireParams()) {
            $mdDialog.hide($scope.userdata);

        } else {
            $scope.showToast('用户名必须填写！', false);
        }
    }
    $scope.cancel = function() {
        console.log('cancle');
        $mdDialog.cancel();
    }

});