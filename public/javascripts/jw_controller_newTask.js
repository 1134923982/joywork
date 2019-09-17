angular.module('joy_work').controller('newTaskCtrl',function($scope, httpManager, $cookies, $state, $mdDialog, $mdToast, $q){
    console.log('new task');
    $scope.projects = [];
    $scope.background_colors = ['#61bd4f','#f2d600','#ff9f1a','#eb5a46','#89609e','#055a8c'];
    $scope.taskData = $scope.currentTask;
    console.log($scope.taskData)

    var canceler = $q.defer();

    getAllProject();


    function checkRequireParams() {
        if ($scope.taskData.task_name && $scope.taskData.project) {
            return true;
        }
        return false;
    }

    $scope.save=function(){
        console.log('save');
        if (checkRequireParams()) {
            $mdDialog.hide($scope.taskData);

        } else {
            $scope.showToast('任务名,任务所属项目必须填写！', false);
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

    $scope.queryProjectSearch = function(query){
        if(query.length ===0 && query===''){
            return [];
        }
        if (canceler.promise) {
            canceler.resolve();
            canceler = $q.defer();
        }
        var deferred = $q.defer();
        deferred.resolve($scope.projects);

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