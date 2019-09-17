angular.module('joy_work').controller('kanbanCtrl', function ($scope, httpManager, $cookies, $state, $mdDialog, $window) {
    console.log('kanban');
    $scope.kanbans = [];
    $scope.loading = true;
    getAllKanban();

    $scope.showAddKanbanDialog = function (ev) {
        $scope.currentKanban = {};
        $scope.currentKanban.shared = false;
        $scope.title = '添加新看板';
        $mdDialog.show({
            templateUrl: 'view/newKanban.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope.$new(),
            clickOutsideToClose: false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (kanban) {
                httpManager.create('/kanban/add', {'kanbandata': kanban}, function (response) {
                    getAllKanban();
                })
            }, function () {
            });
    }

    function getAllKanban() {
        httpManager.retrieve('/kanban/list', function (response) {
            $scope.kanbanList = response.data.kanbanList;
        });
    }

    $scope.onKanbanClick = function (kanban) {
        $cookies.put('kanban', JSON.stringify(kanban))
        $state.go('kanban');
    }

    $scope.removeKanban = function (ev, id) {
        var confirm = $mdDialog.confirm()
            .title('您确定删除这个看板吗?')
            .textContent('这个看板将删除.')
            .ariaLabel('DELETE KANBAN')
            .targetEvent(ev)
            .ok('删除!')
            .cancel('取消');
        $mdDialog.show(confirm).then(function () {
            httpManager.remove('/kanban/delete', {'id': id}, function (response) {
                $scope.kanbanList = $scope.kanbanList.filter(function (item) {
                    return item._id != id;
                })
            })
        },function () {
        });
    }



});