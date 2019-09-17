angular.module('joy_work').controller('newKanbanCtrl',function($scope, httpManager, $cookies, $state, $mdDialog, $mdToast, $q){
    console.log('new project');
    $scope.projects = [];
    $scope.kanbanData = $scope.currentKanban;
    if(!$scope.kanbanData.projects) {
        $scope.kanbanData.projects = [];
    }
    if(!$scope.kanbanData.background_color){
        $scope.kanbanData.background_color = '#0079bf';
    }
    var canceler = $q.defer();

    getAllProject();

    $scope.example1settings = {
        scrollableHeight: '100px',
        scrollable: true,
        enableSearch: true,
        //displayProp: 'id',
        showSelectAll: true,
        showEnableSearchButton: true,
        selectionLimit: 5,
        styleActive: true,
        electedToTop: true,
    };

    function checkRequireParams() {
        if ($scope.kanbanData.kanban_name && $scope.kanbanData.team) {
            return true;
        }
        return false;
    }

    $scope.save=function(){
        console.log('save');
        if (checkRequireParams()) {
            if(!$scope.kanbanData.team){
                $scope.kanbanData.team = null;
            }
            $mdDialog.hide($scope.kanbanData);
            $scope.showToast('保存看板成功！', true);
        } else {
            $scope.showToast('看板名,看板所属团队必须填写！', false);
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

    function getAllProject() {
        $scope.loading = true;
        if (!$cookies.get('userInfo')) {
            return;
        }
        httpManager.retrieve('/projects/list?id=' + JSON.parse($cookies.get('userInfo'))._id, function (response) {
            $scope.projects = response.data.projects;
            $scope.projects.forEach(function (item) {
                item.owner = JSON.parse(item.owner);
                item.label = item.project_name;
            })
            console.log($scope.projects);
        });
    }

});