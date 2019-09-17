angular.module('joy_work').controller('changePasswordCtrl',function($scope, httpManager, $cookies, $mdDialog){
    $scope.oldPassword = '';


    $scope.submitForm=function(){
        console.log('save');
        console.log($scope.userdata)
        // if($scope.oldPassword !== $scope.userdata.password){
        //     $scope.showToast('原密码填写错误！', false);
        //     return;
        // }
        console.log($scope.oldPassword);
        if ($scope.userdata.newPassword === $scope.userdata.repeatPassword) {
            $mdDialog.hide($scope.userdata);

        } else {
            $scope.showToast('两次输入密码不一致！', false);
        }
    }
    $scope.cancel = function() {
        console.log('cancle');
        $mdDialog.cancel();
    }

});