angular.module('joy_work').controller('loginCtrl',function($scope, httpManager, $cookies, $state){
    $scope.userdata = {};
    $scope.userdata.remenberPassword = false;
    $scope.message = '';
    if ($cookies.get('userInfo')) {
        var userInfo = JSON.parse($cookies.get('userInfo'));
        if (userInfo.login) {
            $state.go('home');
        }
    }
    if ($cookies.get('userdata')) {
        console.log($cookies.get('userdata'))
        var userdata = JSON.parse($cookies.get('userdata'));
        $scope.userdata.account = userdata.account;
        $scope.userdata.password = userdata.password;
        $scope.userdata.remenberPassword = userdata.remenberPassword;
    }
    $scope.onLoginClick = function () {
        httpManager.create('/users/login', {'userdata': $scope.userdata}, function (response) {
            console.log(response);
            //$cookies.put('userInfo', JSON.stringify(response.data.user));
            if(response.data.code === 0){
                console.log($cookies.get('userInfo'));
                $scope.$emit('login');
                if (!$scope.userdata.remenberPassword) {
                    $scope.userdata.password = '';
                }
                $scope.message = '';
                $cookies.put('userdata', JSON.stringify($scope.userdata), {maxAge: 7 * 24 * 60 * 60});
                $state.go('home');
            } else{
                $scope.message = '邮箱或者密码错误！';
            }

        });
    }
});