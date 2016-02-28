var app = angular.module('app')
    .controller('HomeController', function($scope) {
        $scope.saveChoices = function() {
            $('#saveChoicesModal').modal('show');
        };

        $('#saveChoicesModal').on('hidden.bs.modal', function() {
            $(this).find('form')[0].reset();
        });

        $scope.saveModalSubmit = function() {
            var saveName = $('#saveChoicesModal').find('input#name').val().trim();
            var choices = getChoices();
        }

        function getChoices() {
            var inputs = $('#home').find('form#choices').find('input[type="text"]');
            var choices = [];
            for (var i = 0; i<inputs.length; i++) {
                var value = $(inputs[i]).val().trim();
                choices.push(value);
            }
            return choices;
        }
    });