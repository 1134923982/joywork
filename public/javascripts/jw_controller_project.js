angular.module('joy_work').controller('projectCtrl', function ($scope, httpManager, $cookies, $state, $mdDialog, $window) {
    console.log('project');
    $scope.projects = [];
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.pageCount = 1;
    $scope.pageTotal = 10;
    $scope.pages = [];
    var projectCount = 0;
    getProjects();
    getProjectsCount();
    getAllTeams();
    $scope.teams = [];
    $scope.selectTeams = [];

    $scope.settings = {
        scrollableHeight: '300px',
        selectedToTop: true,
        scrollable: true,
        enableSearch: true,
        displayProp: 'team_name',
        showSelectAll: true,
        //buttonClasses: '',
        //showEnableSearchButton: true,
        selectionLimit: 100,
        //styleActive: true,
    };
    $scope.customEvents = {
        onItemSelect: function (item) {
            console.log(item);
        },
        // onItemDeselect: angular.noop,
        // onSelectAll: angular.noop,
        // onDeselectAll: angular.noop,
        // onInitDone: angular.noop,
        // onMaxSelectionReached: angular.noop,
        // onSelectionChanged: angular.noop,
        onClose: function () {
            $scope.currentPage = 1;
            console.log($scope.selectTeams);
            getProjects(1);
            getProjectsCount();
        }
    }

    $scope.removeProject = function (ev, project) {
        var confirm = $mdDialog.confirm()
            .title('您确定删除这个项目吗?')
            .textContent('这个项目将删除.')
            .ariaLabel('DELETE PROJECT')
            .targetEvent(ev)
            .ok('删除!')
            .cancel('取消');
        $mdDialog.show(confirm).then(function () {
            httpManager.remove('/projects/delete', {'id': project._id}, function (response) {
                projectCount--;
                $scope.pageCount = Math.ceil(projectCount/$scope.pageTotal);
                if($scope.pageCount<$scope.pages.length) {
                    $scope.pages.splice($scope.pageCount,1);
                    getProjects($scope.pageCount)
                }
                $scope.projects = $scope.projects.filter(function (item) {
                    return item._id != project._id;
                })
            })
        },function () {
        });

        // console.log(project);
        // httpManager.remove('/projects/delete', {'id': project._id}, function (response) {
        //     projectCount--;
        //     $scope.pageCount = Math.ceil(projectCount/$scope.pageTotal);
        //     if($scope.pageCount<$scope.pages.length) {
        //         $scope.pages.splice($scope.pageCount,1);
        //         getProjects($scope.pageCount)
        //     }
        //     $scope.projects = $scope.projects.filter(function (item) {
        //         return item._id != project._id;
        //     })
        // })
    }

    $scope.showUpdateProjectDialog = function (ev, project) {
        $scope.currentProject = project;
        $scope.title = '修改项目';
        $mdDialog.show({
            templateUrl: 'view/newProject.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (project) {
                httpManager.update('/projects/update', {'projectdata': project}, function (response) {
                    $scope.showToast('保存成功！', true);
                })
            }, function () {
                console.log('concel');
            });
    }

    $scope.showAddProjectDialog = function (ev) {
        $scope.currentProject = {};
        $scope.title = '添加一个新项目';
        $mdDialog.show({
            templateUrl: 'view/newProject.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (project) {
                console.log(project);
                httpManager.create('/projects/add', {'projectdata': project}, function (response) {
                    $scope.showToast('保存成功！', true);
                    projectCount++;
                    $scope.pageCount = Math.ceil(projectCount/$scope.pageTotal);
                    if($scope.pageCount>$scope.pages.length) {
                        console.log('add page')
                        $scope.pages.push($scope.pageCount)
                    }
                    getProjects();
                })
            }, function () {
                console.log('concel');
            });
    }

    $scope.getProjects = function (page) {
        if(page === $scope.currentPage || page<=0 || page > $scope.pageCount)
            return;
        getProjects(page);
    }

    $scope.onSearchBlur = function () {
        console.log($scope.searchText)
    }

    function getProjects(page) {
        $scope.currentPage = page || 1;
        $scope.selectTeams = $scope.selectTeams? $scope.selectTeams: [];
        var selectTeams = [];
        $scope.selectTeams.forEach(function (item) {
            selectTeams.push(item._id);
        })
        httpManager.retrieve('/projects/list?currentPage='+$scope.currentPage + '&&pageTotal='+$scope.pageTotal+'&&currentTeams='+selectTeams, function (response) {
            $scope.projects = response.data.projects;
            $scope.projects.forEach(function (item) {
                item.owner = JSON.parse(item.owner);
                item.team = JSON.parse(item.team);
            })
            $scope.loading = false;
        });
    }

    function getProjectsCount() {
        $scope.selectTeams = $scope.selectTeams? $scope.selectTeams: [];
        var selectTeams = [];
        $scope.selectTeams.forEach(function (item) {
            selectTeams.push(item._id);
        });
        httpManager.retrieve('/projects/sum?currentTeams='+selectTeams, function (response) {
            $scope.pageCount = Math.ceil(response.data.count/$scope.pageTotal);
            projectCount = response.data.count;
            $scope.pages = [];
            for(var i=0; i<$scope.pageCount; i++){
                $scope.pages.push(i+1);
            }
        });
    }

    function getAllTeams() {
        // $scope.currentPage = page || 1;
        httpManager.retrieve('/teams/list', function (response) {
            $scope.teams = response.data.teams;
            for(var i=0; i<$scope.teams.length; i++){
                for(var j=0; j<$scope.teams[i].members.length; j++){
                    $scope.teams[i].members[j] = JSON.parse($scope.teams[i].members[j]);
                }
            }
            console.log($scope.teams)
        },function (err) {
            $scope.showToast('获取数据失败，请刷新重试！', false);
        })
    }


});
