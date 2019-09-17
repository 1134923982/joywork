angular.module('joy_work').controller('kanbanPageCtrl', function ($scope, httpManager, $cookies, $state, $mdDialog, $stateParams, $q) {
    console.log('kanbanPage');
    $scope.projects = [];
    $scope.currentKanban = {};
    $scope.currentKanban._id = JSON.parse($cookies.get('kanban'))._id;
    $scope.oldKanban = {};
    $scope.newList = {};
    $scope.newTask = {};
    $scope.showAddList = false;
    $scope.lists = [];
    $scope.oldLists = [];
    $scope.editListName = false;
    $scope.showAddTask = false;
    $scope.onDragging = false;
    $scope.teams = [];
    var canceler = $q.defer();
    getKanbanDetail();
    getAllTeams();


    if ($cookies.get('userInfo')) {
        var userInfo = JSON.parse($cookies.get('userInfo'));
        if (!userInfo.login) {
            $state.go('login');
        }
    } else {
        $state.go('login');
    }

    $scope.example1model = [];
    $scope.settings = {
        scrollableHeight: '300px',
        selectedToTop: true,
        scrollable: true,
        enableSearch: true,
        displayProp: 'project_name',
        showSelectAll: true,
        buttonClasses: 'btn btn-info select-project',
        //showEnableSearchButton: true,
        selectionLimit: 5,
        //styleActive: true,
    };
    $scope.editableKanban = true;
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
            $scope.saveKanban('projects')
        }
    }


    $scope.onEditKanbanNameClick = function () {
        $scope.editableKanban = false;
    }

    function getAllProject() {
        $scope.loading = true;
        if (!$cookies.get('userInfo')) {
            return;
        }
        httpManager.retrieve('/projects/list_team?team_id='+ $scope.currentKanban.team._id, function (response) {
            $scope.projects = response.data.projects;
            $scope.projects.forEach(function (item) {
                //item.owner = JSON.parse(item.owner);
                for (var i = 0; i < $scope.currentKanban.projects.length; i++) {
                    if ($scope.currentKanban.projects[i]._id === item._id) {
                        $scope.currentKanban.projects[i] = item;
                    }
                }
            });
            getAllLists();

        });
    }

    $scope.saveKanban = function (field) {
        if ($scope.currentKanban[field] === $scope.oldKanban[field]) {
            return;
        }
        console.log(field)
        var doc = {};
        doc[field] = $scope.currentKanban[field];
        httpManager.update('/kanban/update', {'id': $scope.currentKanban._id, 'doc': doc}, function (response) {
            $scope.oldKanban = $scope.currentKanban;
        });
    }
    $scope.onAddListClick = function () {
        if (!$scope.newList.list_name) {
            $scope.showToast('列表名不能为空！', false);
            return;
        }
        $scope.newList.kanban_id = $scope.currentKanban._id;

        if ($scope.lists.length === 0) {
            $scope.newList.order = 0;
        } else {
            $scope.newList.order = $scope.lists[$scope.lists.length - 1].order + 1;
        }
        $scope.newList.task_orders = [];
        httpManager.create('/list/add', {'listData': $scope.newList}, function (response) {
            $scope.showAddList = false;
            $scope.newList = {};
            getAllLists();
        })
    }

    // $scope.onAddTaskClick = function (list, index) {
    //     if (!$scope.newTask.task_name) {
    //         $scope.showToast('任务名不能为空！', false);
    //         return;
    //     }
    //     $scope.newTask.kanban_id = $scope.currentKanban._id;
    //     $scope.newTask.list_id = list._id;
    //     $scope.newTask.owner = $scope.newTask.owner ? $scope.newTask.owner : JSON.parse($cookies.get('userInfo'))._id;
    //
    //     httpManager.create('/tasks/add', {'taskData': $scope.newTask}, function (response) {
    //         $scope.lists[index].tasks.push(response.data.task);
    //         $scope.lists[index].task_orders.push(response.data.task._id);
    //         //$scope.saveList($scope.lists[index],index);
    //
    //         httpManager.update('/list/update', {'listData': $scope.lists[index]}, function (response) {
    //             console.log(response)
    //         })
    //         $scope.newTask = {};
    //         $scope.showAddTask = false;
    //     })
    // }

    $scope.saveList = function (list, index) {
        if (list.list_name === '' || list.list_name.length === 0) {
            list.list_name = $scope.oldLists[index].list_name;
            return;
        }
        if (list.list_name === $scope.oldLists[index].list_name) {
            return;
        }
        console.log('save..list');
        httpManager.update('/list/update', {'listData': list}, function (response) {
            console.log(response)
        })

    }

    $scope.onDeleteTaskClick = function (task, list_id, index) {
        httpManager.remove('/tasks/delete', {'id': task._id}, function (response) {
            for (var i = 0; i < $scope.lists.length; i++) {
                if ($scope.lists[i]._id === list_id) {
                    $scope.lists[i].tasks.splice(index, 1);
                    break;
                }
            }
        })
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


    $scope.onAddTaskClick = function (ev, list, index) {
        $scope.currentTask = {};
        $scope.currentTask.kanban_id = $scope.currentKanban._id;
        $scope.currentTask.list_id = list._id;
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
                console.log(task)
                httpManager.create('/tasks/add', {'taskData': task}, function (response) {
                    console.log(index)
                    console.log($scope.lists)
                    $scope.lists[index].tasks.push(response.data.task);
                    $scope.lists[index].task_orders.push(response.data.task._id);
                    //$scope.saveList($scope.lists[index],index);

                    httpManager.update('/list/update', {'listData': $scope.lists[index]}, function (response) {
                        console.log(response)
                    })
                    $scope.showToast('保存成功！', true);
                })
            }, function () {
            });
    }

    $scope.queryTeamSearch = function (query) {
        if (query.length === 0 && query === '') {
            return [];
        }
        if (canceler.promise) {
            canceler.resolve();
            canceler = $q.defer();
        }
        var deferred = $q.defer();
        console.log(query);
        httpManager.retrieveTimeOut('/teams/search?keyword=' + query, canceler.promise, function (response) {
            console.log(response.data.teams);
            deferred.resolve(response.data.teams);
        });
        return deferred.promise;

    }

    function getAllTeams() {
        //$scope.currentPage = page || 1;
        httpManager.retrieve('/teams/list?', function (response) {
            $scope.teams = response.data.teams;
            console.log($scope.teams)
        },function (err) {
            $scope.showToast('获取数据失败，请刷新重试！', false);
        })
    }

    function saveTask(task) {
        httpManager.update('/tasks/update', {'taskData': task}, function (response) {
            $scope.showToast('保存成功！', true);
        })
    }

    $scope.onDropComplete = function (list, item, index) {
        $scope.onDragging = false;
        var updatLists = [];
        //将card从原列表移到新列表
        // if (item.list_id === list._id) {
        for (var i = 0; i < $scope.lists.length; i++) {
            if ($scope.lists[i]._id === item.list_id) {
                for (var j = 0; j < $scope.lists[i].tasks.length; j++) {
                    if (item._id === $scope.lists[i].tasks[j]._id) {
                        $scope.lists[i].tasks.splice(j, 1);
                        break;
                    }
                }
                //原列表的排列顺序需要改变
                $scope.lists[i].task_orders = [];
                for (var j = 0; j < $scope.lists[i].tasks.length; j++) {
                    $scope.lists[i].task_orders.push($scope.lists[i].tasks[j]._id);
                }
                updatLists.push($scope.lists[i]);
                break;
            }
        }
        //新列表改变顺序
        list.tasks.splice(index, 0, item);
        list.task_orders = [];
        list.tasks.forEach(function (i) {
            list.task_orders.push(i._id);
        });
        updatLists.push(list);

        item.list_id = list._id;
        saveTask(item);
        httpManager.update('/list/update_list', {'listData': updatLists}, function (response) {
            console.log('save完成');
        })
    }

    $scope.onDragStart = function () {
        console.log('start...')
        $scope.onDragging = true;
    }

    function getKanbanDetail() {
        if (!$cookies.get('kanban')) {
            return;
        }
        httpManager.retrieve('/kanban/kanban_detail?id=' + JSON.parse($cookies.get('kanban'))._id, function (response) {
            $scope.currentKanban = response.data.kanban;
            for (var i = 0; i < $scope.currentKanban.projects.length; i++) {
                $scope.currentKanban.projects[i] = JSON.parse($scope.currentKanban.projects[i]);
            }
            console.log($scope.currentKanban)
            $scope.currentKanban.team = $scope.currentKanban.team ? JSON.parse($scope.currentKanban.team) : null;
            $scope.oldKanban = angular.copy($scope.currentKanban);
            getAllProject();
        });
    }

    function getAllLists() {
        httpManager.retrieve('/list/list?id=' + $scope.currentKanban._id, function (response) {
            //console.log(new Date(response.data.lists[0].create_time.toLocaleString()));
            $scope.lists = response.data.lists;

            $scope.oldLists = angular.copy($scope.lists);
            getAllTasks();
        });
    }

    function getAllTasks() {
        httpManager.retrieve('/tasks/list?id=' + $scope.currentKanban._id, function (response) {

            var taskList = response.data.taskList;
            for (var i = 0; i < $scope.lists.length; i++) {
                $scope.lists[i].tasks = [];
                for (var j = 0; j < $scope.lists[i].task_orders.length; j++) {
                    for (var k = 0; k < taskList.length; k++) {
                        if ($scope.lists[i].task_orders[j] === taskList[k]._id) {
                            if (taskList[k].project_id) {
                                taskList[k].project = $scope.projects.filter(function (item) {
                                    return item._id === taskList[k].project_id;
                                })[0];
                            }
                            taskList[k].owner = JSON.parse(taskList[k].owner);
                            $scope.lists[i].tasks.push(taskList[k]);
                        }
                    }
                }
            }
        });
    }
});