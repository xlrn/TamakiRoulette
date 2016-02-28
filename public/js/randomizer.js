function chooseOne() {
  var One = Math.floor(Math.random() * 6) + 1;
  return One;
}

function setChoice() {
  $('#randomized').val() = chooseOne();
}

$(document).ready(function () {
    $('#randomizer').click(setChoice);
    $('#randomizer').bind('keypress', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            redirectToSearch();
        }
    });
});
