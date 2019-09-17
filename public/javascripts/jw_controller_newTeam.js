angular.module('joy_work').controller('newTeamCtrl',function($scope, httpManager, $cookies, $state, $mdDialog, $mdToast, $q){
    console.log('new team');
    // $scope.users = [];
    $scope.teamData = $scope.currentTeam;
    if(!$scope.teamData.members) {
        $scope.teamData.members = [];
    }

    var canceler = $q.defer();

    // getAllUsers();

    $scope.settings = {
        scrollableHeight: '300px',
        selectedToTop: true,
        scrollable: true,
        enableSearch: true,
        // displayProp: 'project_name',
        showSelectAll: true,
        //buttonClasses: '',
        //showEnableSearchButton: true,
        selectionLimit: 100,
        //styleActive: true,
    };

    function checkRequireParams() {
        if ($scope.teamData.team_name) {
            return true;
        }
        return false;
    }

    $scope.save=function(){
        console.log('save');
        if (checkRequireParams()) {
            $mdDialog.hide($scope.teamData);

        } else {
            $scope.showToast('团队名称必须填写！', false);
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

    // function getAllUsers() {
    //     $scope.loading = true;
    //     if (!$cookies.get('userInfo')) {
    //         return;
    //     }
    //     httpManager.retrieve('/users/list', function (response) {
    //         console.log(response.data.users);
    //         $scope.users = response.data.users;
    //         $scope.users.forEach(function (item) {
    //             item.label = item.username + '(' + item.email + ')';
    //         })
    //     });
    // }

});