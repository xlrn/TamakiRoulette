var app = angular.module('app')
    .service('RouletteService', ['$http', function($http) {
        //get roulettes
        this.get = function() {
            return $http.get("/roulette");
        };

        //save roulette
        this.post = function(json) {
            return $http.post('/save', json);
        };

        //get choices
        this.getChoices = function(rouletteId) {
            return $http({
                method: 'GET',
                url: '/choices',
                params: {id: rouletteId}
            });
        }
    }]);