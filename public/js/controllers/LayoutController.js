var app = angular.module('app')
.controller('LayoutController', ['$scope', '$http', 'AccountService', function($scope, $http, AccountService) {

        $scope.openSignupModal = function() {
            $('#signupModal').modal('show');
        };

        $scope.openLoginModal = function(alertMsg) {
            if (alertMsg) {
                alert(alertMsg);
            }
            $('#loginModal').modal('show');
        };

        $scope.closeSignupModal = function() {
            $('#signupModal').modal('hide');
        };

        $scope.closeLoginModal = function() {
            $('#loginModal').modal('hide');
        };

        $('#signupModal').on('hidden.bs.modal', function() {
            $scope.signupFormStatus = "";
            $(this).find('form')[0].reset();
        });

        $('#loginModal').on('hidden.bs.modal', function() {
            $scope.loginFormStatus = "";
            $(this).find('form')[0].reset();
        });

        $scope.login = function() {
            $scope.loginFormStatus = "";
            var loginData = $.param($scope.loginData);
            AccountService.login(loginData)
                .then(function (res) {
                    var data = res.data;
                    if (data.success) {
                        $scope.closeLoginModal();
                        window.location.replace('/');
                    }
                    else {
                        $scope.loginFormStatus = data.message || "Failed. Please try again.";
                    }
                },
                function () {
                    $scope.loginFormStatus = "Server error. Please try again.";
                });
        };

        $scope.signup = function() {
            $scope.signupFormStatus = "";
            var signupData = $.param($scope.signupData);
            AccountService.signup(signupData)
                .then(function (res) {
                    var data = res.data;
                    if (data.success) {
                        $scope.closeSignupModal();

                        var message = "Account successfully created. Please log in.";
                        $scope.openLoginModal(message);
                    }
                    else {
                        $scope.signupFormStatus = data.message || "Failed. Please try again.";
                    }
                },
                function () {
                    $scope.signupFormStatus = "Server error. Please try again.";
                });
        };

        $scope.logout = function() {
            AccountService.logout()
                .finally(function() {
                    window.location.replace('/');
                });
        };

    }]);