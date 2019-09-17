angular.module('joy_work').controller('taskCtrl', function ($scope, httpManager, $cookies, $state, $mdDialog, $window, $mdSidenav) {
    console.log('task');
    $scope.users = [];
    $scope.currentPage = 1;
    $scope.pageCount = 1;
    $scope.pageTotal = 10;
    $scope.pages = [];
    getAllTeams();
    $scope.teams = [];
    $scope.selectTeams = [];
    var taskCount = 0;

    //getAllUsers();
    getTasksCount();
    // getAllTasks();
    getTasks();

    $scope.teams = [];

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
            // $scope.currentPage = 1;
            console.log($scope.selectTeams);
            getTasksCount();
            getTasks(1);
        }
    }

    $scope.showAddTaskDialog = function (ev) {
        $scope.currentTask = {};
        $scope.title = '添加新任务';
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



    $scope.getTasks = function (page) {
        if(page === $scope.currentPage || page<=0 || page > $scope.pageCount)
            return;
        getTasks(page);
    }

    $scope.removeTask = function (ev, id) {
        var confirm = $mdDialog.confirm()
            .title('您确定删除这个任务吗?')
            .textContent('这个任务将被删除.')
            .ariaLabel('DELETE TASK')
            .targetEvent(ev)
            .ok('删除!')
            .cancel('取消');
        $mdDialog.show(confirm).then(function () {
            httpManager.remove('/tasks/delete', {'id': id}, function (response) {
                $scope.tasks = $scope.tasks.filter(function (item) {
                    return item._id != id;
                });
                taskCount--;
                $scope.pageCount = Math.ceil(taskCount/$scope.pageTotal);
                if($scope.pageCount<$scope.pages.length) {
                    console.log('delete task');
                    $scope.pages.splice($scope.pageCount,1);
                    getTasks($scope.pageCount);
                }
            })
        },function () {
        });
    }

    $scope.onEditTaskClick = function (ev, task) {
        $scope.currentTask = task;
        console.log($scope.currentTask)
        $scope.title = '修改任务';
        $mdDialog.show({
            templateUrl: 'view/newTask.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (task) {
                saveTask(task);
            }, function () {
            });
    }

    $scope.onAddTaskClick = function (ev) {
        $scope.currentTask = {};
        $scope.title = '新建任务';
        $mdDialog.show({
            templateUrl: 'view/newTask.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (task) {
                httpManager.create('/tasks/add', {'taskData': task}, function (response) {
                    taskCount++;
                    $scope.pageCount = Math.ceil(taskCount/$scope.pageTotal);
                    if($scope.pageCount>$scope.pages.length) {
                        console.log('add page')
                        $scope.pages.push($scope.pageCount)
                    }
                    $scope.showToast('保存成功！', true);
                })
            }, function () {
            });
    }

    function saveTask(task) {
        httpManager.update('/tasks/update', {'taskData': task}, function (response) {
            $scope.showToast('保存成功！', true);
        })
    }

    function getTasks(page) {
        $scope.currentPage = page || 1;
        $scope.selectTeams = $scope.selectTeams? $scope.selectTeams: [];
        var selectTeams = [];
        $scope.selectTeams.forEach(function (item) {
            selectTeams.push(item._id);
        })
        httpManager.retrieve('/tasks/list_table?currentPage='+$scope.currentPage + '&&pageTotal='+$scope.pageTotal+'&&currentTeams='+selectTeams, function (response) {
            $scope.tasks = response.data.tasks;
            $scope.tasks.forEach(function (item) {
                item.project = JSON.parse(item.project);
                item.owner = JSON.parse(item.owner);
            })
            console.log($scope.tasks)
        },function (err) {
            $scope.showToast('获取数据失败，请刷新重试！', false);
        })
    }

    // function getAllTasks() {
    //     httpManager.retrieve('/tasks/list_table',function (response) {
    //         console.log(response);
    //     })
    // }

    function getTasksCount(){
        $scope.selectTeams = $scope.selectTeams? $scope.selectTeams: [];
        var selectTeams = [];
        $scope.selectTeams.forEach(function (item) {
            selectTeams.push(item._id);
        });
        httpManager.retrieve('/tasks/sum?currentTeams='+selectTeams, function (response) {
            $scope.pageCount = Math.ceil(response.data.count/$scope.pageTotal);
            taskCount = response.data.count;
            console.log(taskCount)
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
