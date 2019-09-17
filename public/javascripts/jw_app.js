var app = angular.module('joy_work',
    ['ngMaterial',
        'ngMessages',
        'ngAnimate',
        'ui.router',
        'ngCookies',
        'angularjs-dropdown-multiselect',
        'colorpicker.module',
        // 'ngDraggable',
        'dndLists',
    ]);
//ui-route support 平级跳转，不支持父子级
app.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,  $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/home", "/home/page");
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'view/login.ejs'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'view/register.ejs'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'view/home.ejs'
        })
        .state('home.page', {
            url: '/page',
            templateUrl: 'view/homePage.ejs'
        })
        // .state('home.userData', {
        //     url: '/userData',
        //     templateUrl: 'view/userData.ejs'
        // })
        .state('home.kanban', {
            url: '/kanban',
            templateUrl: 'view/homeKanban.ejs'
        })
        .state('home.team', {
            url: '/team',
            templateUrl: 'view/homeTeam.ejs'
        })
        .state('home.project', {
            url: '/project',
            templateUrl: 'view/homeProject.ejs'
        })
        .state('home.task', {
            url: '/task',
            templateUrl: 'view/homeTask.ejs'
        })
        .state('kanban', {
            url: '/kanban',
            templateUrl: 'view/kanban.ejs'
        })
}]);


// myApp.run(function($rootScope, $state, $stateParams){
//     $rootScope.$state = $state;
//     $rootScope.$stateParams = $stateParams;
//     $rootScope.$state.isLogin = false;
// });
// app.run(function($rootScope, $cookies, $state, $stateParams) {
    // $rootScope.$state = $state;
    // $rootScope.$stateParams = $stateParams;
    // $rootScope.$state.isLogin = false;
    // if ($cookies.get('userInfo')) {
    //     var userInfo = JSON.parse($cookies.get('userInfo'));
    //     if (!userInfo.login) {
    //         $state.go('login');
    //     }
    // } else {
    //     $state.go('login');
    // }
// });