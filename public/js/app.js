var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
    .controller('App', function($scope) {

        $scope.year = new Date().getFullYear();

        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass('animated ' + animationName);
                });
            }
        });

        $scope.shuffleArray = function(array) {
            //Fisher-Yates shuffle algorithm
            var m = array.length, t, i;

            //Whil there remain elements to shuffle
            while(m) {
                //Pick a remaining element...
                i = Math.floor(Math.random() * m--);

                //Swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
});