var app = angular.module('app')
    .service('AccountService', ['$http', function($http) {
        //get account
        this.getAccount = function() {
            return $http.get("/account", {timeout: 10000});
        };

        // Signup
        this.signup = function(formData) {
            return $http({
                method: 'POST',
                url: '/signup',
                data: formData,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
                config: {timeout: 10000}
            });
        };

        // Login
        this.login = function(formData) {
            return $http({
                method: 'POST',
                url: '/login',
                data: formData,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
                config: {timeout: 10000}
            });
        };

        //Logout
        this.logout = function() {
            return $http.get('/logout', {timeout: 10000});
        };
    }]);