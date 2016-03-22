var app = angular.module('app')
    .service('RouletteService', ['$http', function($http) {
        //get list of all roulettes
        this.getAll = function() {
            return $http.get("/roulettes", {timeout: 10000});
        };

        //save roulette
        this.post = function(json) {
            return $http.post('/roulettes', json, {timeout: 10000});
        };

        //get one roulette's choices
        this.getOne = function(rouletteId) {
            return $http.get('/roulettes/' + rouletteId, {timeout: 10000});
        };

        //Update a roulette
        this.updateName = function(roulette) {
            return $http.put('roulettes', roulette, {timeout: 10000});
        };

        //Delete a roulette
        this.delete = function(rouletteId) {
            return $http.delete('roulettes/' + rouletteId, {timeout: 10000});
        }
    }]);