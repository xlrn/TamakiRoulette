var app = angular.module('app')
    .service('RouletteService', ['$http', function($http) {
        //get list of all roulettes
        this.getAll = function() {
            return $http.get("/roulettes");
        };

        //save roulette
        this.post = function(json) {
            return $http.post('/roulettes', json);
        };

        //get one roulette's choices
        this.getOne = function(rouletteId) {
            return $http.get('/roulettes/' + rouletteId);
        };

        //Update a roulette
        this.put = function(roulette) {
            return $http.put('roulettes', roulette);
        };

        //Delete a roulette
        this.delete = function(roulette) {
            return $http.delete('roulettes/' + roulette);
        }
    }]);