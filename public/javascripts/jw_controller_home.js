angular.module('joy_work').controller('homeCtrl',function($scope, httpManager, $cookies, $state){
    console.log('this is home'+$cookies.get('userInfo'));
    if ($cookies.get('userInfo')) {
        var userInfo = JSON.parse($cookies.get('userInfo'));
        if (!userInfo.login) {
            $state.go('login');
        }
    } else {
        $state.go('login');
    }

    $scope.onHomePageClick = function () {
        $cookies.put('lastHomePage', 'home.page');
        $state.go('home.page');
    }
    $scope.onHomeKanbanClick = function () {
        $cookies.put('lastHomePage', 'home.kanban');
        $state.go('home.kanban');
    }
    $scope.onHomeProjectClick = function () {
        $cookies.put('lastHomePage', 'home.project');
        $state.go('home.project');
    }
    $scope.onHomeTeamClick = function () {
        $cookies.put('lastHomePage', 'home.team');
        $state.go('home.team');
    }
    $scope.onHomeTaskClick = function () {
        $cookies.put('lastHomePage', 'home.task');
        $state.go('home.task');
    }
    $scope.onUserDataClick = function () {
        $cookies.put('lastHomePage', 'home.userData');
        $state.go('home.userData');
    }

});