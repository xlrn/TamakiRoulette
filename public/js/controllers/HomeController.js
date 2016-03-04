var app = angular.module('app')
    .controller('HomeController', ['$scope', '$compile', 'RouletteService', function ($scope, $compile, RouletteService) {
        getSavedRoulettes();

        function getSavedRoulettes() {
            RouletteService.get().then(function (res) {
                $scope.savedRoulettes = $scope.shuffleArray(res.data);
                if ($scope.savedRoulettes.length === 0) {
                    $scope.noSavedRoulettes = "No saved roulettes";
                }
            }, function () {
                $scope.noSavedRoulettes = "Error getting saved roulettes";
            })
        }

        var numChoices = 6;

        $scope.saveRoulette = function () {
            $('#saveRouletteModal').modal('show');
        };

        $('#saveRouletteModal').on('hidden.bs.modal', function () {
            $(this).find('form')[0].reset();
        });

        $scope.saveModalSubmit = function () {
            var choices = getChoices();
            var json = {'cName': $scope.saveName, 'choices': choices}
            RouletteService.post(json).then(function () {
                    renderNotification(true, "Successfully saved choices");
                    getSavedRoulettes();
                },
                function () {
                    renderNotification(false, "Failed to save choices");
                });
        };

        function renderNotification(success, message) {
            var statusElement = $('#notification');
            statusElement.removeClass();
            if (success) {
                $scope.notification = message;
                statusElement.addClass('success');
            }
            else {
                $scope.notification = message;
                statusElement.addClass('fail');
            }
            statusElement.animateCss('fadeInDown');

            statusElement.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                setTimeout(function () {
                    statusElement.animateCss('fadeOutUp');
                    statusElement.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $scope.notification = "";
                        statusElement.removeClass();
                        $scope.$apply();
                    });
                }, 3000);
            });
        }

        function getChoices() {
            var inputs = $('#home').find('form#choices').find('input[type="text"]');
            var choices = [];
            for (var i = 0; i < inputs.length; i++) {
                var value = $(inputs[i]).val().trim();
                if (value.length > 0) {
                    choices.push(value);
                }
            }
            return choices;
        }

        $scope.resetChoices = function () {
            $("#addMoreChoices").insertBefore("#choices-rows");
            $('#choices-rows').empty();
            numChoices = 0;
            for (var i = 1; i <= 3; i++) {
                $scope.addMoreChoices();
            }
        };

        $('#addMoreChoices').on("click", function () {
            $scope.addMoreChoices();
        });

        $scope.addMoreChoices = function () {
            if ($('#addMoreChoices').length < 1) {

            }
            $('.shift-right').removeClass('shift-right');
            var html = '<div class=\"row shift-right\">';
            html += addInputChoice() + addInputChoice();
            html += '</div>';
            $('#choices-rows').append(html);

            var choiceId = "#choice" + numChoices;
            $("#addMoreChoices").insertAfter(choiceId);
        };

        function addInputChoice() {
            numChoices++;
            var html = '<input type=\"text\" class=\"form-control\" name=\"choice' + numChoices + '\" id=\"choice' + numChoices + '\" placeholder=\"Choice ' + numChoices + '\"/>';
            return html;
        }

        $scope.viewMoreSavedRoulettes = function () {
            $('#savedRoulettesModal').modal('show');
        };

        $scope.randomize = function () {
            var choices = getChoices();
            if (choices.length < 1) {
                $scope.randomResult = "No inputs! Please make some choices!";
            }
            else {
                $scope.randomResult = choices[Math.floor(Math.random() * choices.length)];
            }
        };

        $scope.generateRandom = function (category) {
            $scope.resetChoices();
            var choices = [];
            switch (category) {
                case "number":
                    for (var i = 1; i <= 100; i++) choices.push(i);
                    break;
                case "headsTails":
                    choices = ["Heads", "Tails"];
                    break;
                case "foodCuisines":
                    choices = ["Mexican", "Italian", "Indian", "Chinese", "Western", "Thai", "Greek", "Korean", "Vietnamese"];
                    break
                case "dice":
                    choices = ["1", "2", "3", "4", "5", "6"];
                    break;
                case "rockPaperScissors":
                    choices = ["Rock", "Paper", "Scissors"];
                    break;
                default:
                    console.error("Error: Invalid category. Cannot randomize");
            }
            autoInputChoices(choices);
            $scope.randomize();
            $('#randomResultModal').modal('show');
        };

        function autoInputChoices(choices) {
            var inputs = $('#home').find('form#choices').find('input[type="text"]');
            while (inputs.length < choices.length) {
                $scope.addMoreChoices();
                inputs = $('#home').find('form#choices').find('input[type="text"]');
            }
            for (var i = 0; i < choices.length; i++) {
                $(inputs[i]).val(choices[i]);
            }
        }

        $scope.loadSavedRouletteId = function (rouletteId) {
            RouletteService.getChoices(rouletteId).then(function(res){
                $scope.resetChoices();
                autoInputChoices(res.data.choices);
            }, function() {
                renderNotification(false, "Failed to get choices from saved roulette");
            });
        };
    }]);