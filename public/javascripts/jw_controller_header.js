angular.module('joy_work').controller('headerCtrl',function($scope, $cookies, $mdSidenav, httpManager, $mdDialog){
    $scope.userdata = {};
    $scope.radioData = ['男','女'];

    if ($cookies.get('userInfo')) {
        console.log($cookies.get('userInfo'))
        var userdata = JSON.parse($cookies.get('userInfo'));
        console.log(userdata )
        $scope.userdata.username = userdata.username;
        $scope.userdata._id = userdata._id;
        $scope.userdata.email = userdata.email;
        $scope.userdata.sex = userdata.sex;
    }

    $scope.updateUserData =function (ev) {
        $scope.title = "修改个人资料";
        $mdDialog.show({
            templateUrl: 'view/userData.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (user) {
                console.log(user)
                httpManager.update('/users/update', {'userdata': $scope.userdata}, function (response) {
                    //var userdata = JSON.parse($cookies.get('userInfo'));
                    console.log($cookies.get('userInfo'))
                    var userdata = JSON.parse($cookies.get('userInfo'));
                    $scope.$emit('login');

                })
            }, function () {
            });
    }

    $scope.updatePassword =function (ev) {
        $scope.title = "修改用户密码";
        $mdDialog.show({
            templateUrl: 'view/changePassword.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (user) {
                console.log(user)
                httpManager.update('/users//change_password', {'userdata': $scope.userdata}, function (response) {
                    //var userdata = JSON.parse($cookies.get('userInfo'));
                    if(response.data.code ===2){
                        $scope.showToast('修改失败，原密码填写错误！', false);
                    }else {
                        if(response.data.code === 1){
                            $scope.showToast('修改失败，请刷新重试！', false);
                        }else {
                            $scope.showToast('修改密码成功，请重新登录！', true);
                            $scope.userdata.oldPassword ='';
                            $scope.userdata.newPassword ='';
                            $scope.userdata.repeatPassword ='';
                            $scope.onLoginOut();
                        }
                    }

                })
            }, function () {
            });
    }
});