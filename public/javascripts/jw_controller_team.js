angular.module('joy_work').controller('teamCtrl', function ($scope, httpManager, $cookies, $state, $mdDialog, $window, $mdSidenav) {
    console.log('team');
    $scope.users = [];
    $scope.currentPage = 1;
    $scope.pageCount = 1;
    $scope.pageTotal = 2;
    $scope.pages = [];
    var teamCount = 0;

    getAllUsers();
    getTeamsCount();

    $scope.teams = [];

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

    $scope.showAddTeamDialog = function (ev) {
        $scope.currentTeam = {};
        $scope.title = '添加新团队';
        $mdDialog.show({
            templateUrl: 'view/newTeam.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (team) {
                console.log(team)
                httpManager.create('/teams/add', {'teamData': team}, function (response) {
                    console.log(response);
                    teamCount++;
                    $scope.pageCount = Math.ceil(teamCount/$scope.pageTotal);
                    if($scope.pageCount>$scope.pages.length) {
                        console.log('add page')
                        $scope.pages.push($scope.pageCount)
                    }
                    $scope.showToast('保存成功！', true);
                })
            }, function () {
            });
    }

    $scope.showUpdateTeamDialog = function (ev, team) {
        $scope.currentTeam = team;
        $scope.title = '修改团队信息';
        $mdDialog.show({
            templateUrl: 'view/newTeam.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (team) {
                console.log(team)
                httpManager.update('/teams/update', {'teamData': team}, function (response) {
                    console.log(response);
                    $scope.showToast('保存成功！', true);
                })
            }, function () {
            });
    }

    $scope.getTeams = function (page) {
        if(page === $scope.currentPage || page<=0 || page > $scope.pageCount)
            return;
        getTeams(page);
    }

    $scope.removeTeam = function (ev, id) {
        var confirm = $mdDialog.confirm()
            .title('您确定删除这个团队吗?')
            .textContent('这个团队将删除.')
            .ariaLabel('DELETE TEAM')
            .targetEvent(ev)
            .ok('删除!')
            .cancel('取消');
        $mdDialog.show(confirm).then(function () {
            httpManager.remove('/teams/delete', {'id': id}, function (response) {
                $scope.teams = $scope.teams.filter(function (item) {
                    return item._id != id;
                });
                teamCount--;
                $scope.pageCount = Math.ceil(teamCount/$scope.pageTotal);
                if($scope.pageCount<$scope.pages.length) {
                    console.log('delete team');
                    $scope.pages.splice($scope.pageCount,1);
                    getTeams($scope.pageCount);
                }
            })
        },function () {
        });
    }

    function getTeams(page) {
        $scope.currentPage = page || 1;
        httpManager.retrieve('/teams/list?currentPage='+$scope.currentPage + '&&pageTotal='+$scope.pageTotal, function (response) {
            $scope.teams = response.data.teams;
            for(var i=0; i<$scope.teams.length; i++){
               for(var j=0; j<$scope.teams[i].members.length; j++){
                   $scope.teams[i].members[j] = JSON.parse($scope.teams[i].members[j]);
                   for(var k=0; k<$scope.users.length;k++){
                       if($scope.teams[i].members[j]._id === $scope.users[k]._id){
                           $scope.teams[i].members[j] = $scope.users[k];
                       }
                   }
               }
            }
        },function (err) {
            $scope.showToast('获取数据失败，请刷新重试！', false);
        })
    }

    function getTeamsCount(){
        httpManager.retrieve('/teams/sum', function (response) {
            $scope.pageCount = Math.ceil(response.data.count/$scope.pageTotal);
            teamCount = response.data.count;
            $scope.pages = [];
            for(var i=0; i<$scope.pageCount; i++){
                $scope.pages.push(i+1);
            }
        });
    }

    function getAllUsers() {
        $scope.loading = true;
        if (!$cookies.get('userInfo')) {
            return;
        }
        httpManager.retrieve('/users/list', function (response) {
            $scope.users = response.data.users;
            $scope.users.forEach(function (item) {
                item.label = item.username + '(' + item.email + ')';
            });
            getTeams();
        });
    }
});