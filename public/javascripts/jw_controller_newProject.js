angular.module('joy_work').controller('newProjectCtrl',function($scope, httpManager, $cookies, $state, $mdDialog, $mdToast, $q){
    console.log('new project');
    $scope.projectData = $scope.currentProject;
    var canceler = $q.defer();
    // $scope.example1model = [];
    // $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"} ];
    // $scope.example1settings = {
    //     scrollableHeight: '100px',
    //     scrollable: true,
    //     enableSearch: true,
    //     showSelectAll: true,
    //     showEnableSearchButton: true,
    //     selectionLimit: 2,
    //     styleActive: true,
    //     electedToTop: true,
    // };

    function checkRequireParams() {
        if ($scope.projectData.project_name && $scope.projectData.owner && $scope.projectData.desc && $scope.projectData.team) {
            return true;
        }
        return false;
    }

    $scope.save=function(){
        console.log('save');
        if (checkRequireParams()) {
            $mdDialog.hide($scope.projectData);
        } else {
            $scope.showToast('项目名,项目描述,项目负责人必须填写！', false);
        }
    }
    $scope.cancel = function() {
        console.log('cancle');
        $mdDialog.cancel();
    }

    $scope.queryUserSearch = function(query){
        if(query.length ===0 && query===''){
            return [];
        }
        if (canceler.promise) {
            canceler.resolve();
            canceler = $q.defer();
        }
        var deferred = $q.defer();
        console.log(query);
        httpManager.retrieveTimeOut('/users/search?keyword='+query, canceler.promise, function (response) {
            console.log(response.data.users);
            deferred.resolve(response.data.users);
        });
        return deferred.promise;
    }

    $scope.queryTeamSearch = function(query){
        if(query.length ===0 && query===''){
            return [];
        }
        if (canceler.promise) {
            canceler.resolve();
            canceler = $q.defer();
        }
        var deferred = $q.defer();
        console.log(query);
        httpManager.retrieveTimeOut('/teams/search?keyword='+query, canceler.promise, function (response) {
            console.log(response.data.teams);
            deferred.resolve(response.data.teams);
        });
        return deferred.promise;
    }

});