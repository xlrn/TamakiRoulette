var app = angular.module('app')
.controller('LayoutController', function($scope) {
        $scope.openSignupModal = function() {
            $('#signupModal').modal('show');
        }

        $scope.openLoginModal = function() {
            $('#loginModal').modal('show');
        }

    });