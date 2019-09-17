angular
    .module('joy_work')
    .factory('httpManager', function ($http) {

        function request(method, path, param, timeout, success, failure) {
            $http({
                url: path,
                method: method,
                data: param,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: timeout
            }).then(function (res) {
                if (typeof success === 'function') {
                    success(res);
                }
            }, function (error) {
                if (typeof failure === 'function') {
                    failure(error);
                }
            });
        }

        return {
            retrieve: function (path, success, failure) {
                request('GET', path, undefined, undefined, success, failure);
            },

            retrieveTimeOut: function (path, timeout, success, failure) {
                request('GET', path, undefined, timeout, success, failure);
            },

            update: function (path, param, success, failure) {
                request('PUT', path, param, undefined, success, failure);
            },

            create: function (path, param, success, failure) {
                request('POST', path, param, undefined, success, failure);
            },

            remove: function (path, param, success, failure) {
                request('DELETE', path, param, undefined, success, failure);
            }
        }
    });