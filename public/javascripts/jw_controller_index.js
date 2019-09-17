angular.module('joy_work').controller('indexCtrl',function($scope, httpManager, $cookies, $state, $window, $mdToast,$mdSidenav){
    $scope.toggleRight = buildToggler('right');
    $scope.innerHeight = $window.innerHeight;
    if ($cookies.get('userInfo')) {
        $scope.user = JSON.parse($cookies.get('userInfo'));
        $scope.login = true;
        $scope.login_id= $scope.user._id;
        $scope.login_username= $scope.user.username;
        $scope.login_email= $scope.user.email;
    }
    $scope.$on('login', function () {
        if ($cookies.get('userInfo')) {
            $scope.user = JSON.parse($cookies.get('userInfo'));
        }
        console.log('login')
    });
    $scope.$watch(function(){
        return $window.innerHeight;
    }, function(value) {
        $scope.innerHeight=value;
    });

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.onLoginOut = function () {
        httpManager.create('/users/loginout',{}, function (response) {
            console.log(response);
            //$cookies.put('userInfo', JSON.stringify(response.data.user));
            console.log('退出登录成功');
            $scope.user = null;
            $scope.login = false;
            $scope.login_id= "";
            $scope.login_username= "";
            $scope.login_email= "";
            $state.go('login');
        });
    }

    $scope.showToast = function (content, isSuccess) {
        if(typeof content!=='string'){
            return;
        }
        $mdToast.show({
            template: '<md-toast ng-style="{\'background-color\':'+isSuccess+'?\'\':\'#d73b3e\'}"><span class="md-toast-text">'+content+'</span><button class="md-action md-button" ng-click="toast.resolve()"><md-icon style="color:white;">close<md-icon></button></md-toast>',
            position: 'fixed top left right',
            hideDelay: 2000,
            controller: ["$scope", function($scope) {
                var me = this;
                me.resolve = function() {
                    $mdToast.hide();
                };
            }],
            controllerAs: 'toast'
        });
    };

    $scope.onHomeClick = function () {
        var lastHomePage = $cookies.get('lastHomePage') || 'home';
        $state.go(lastHomePage);
    }
});