var app = angular.module('app')
.controller('LayoutController', function($scope) {

        $scope.openSignupModal = function() {
            $('#signupModal').modal('show');
        };

        $scope.openLoginModal = function() {
            $('#loginModal').modal('show');
        };

        $('#signupModal').on('hidden.bs.modal', function() {
            $(this).find('form')[0].reset();
        });

        $('#loginModal').on('hidden.bs.modal', function() {
            $(this).find('form')[0].reset();
        });

        $scope.login = function() {

        };

        $scope.createAccount = function() {

        };

        $scope.logout = function() {

        };

    });