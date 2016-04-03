// Custom validator based on expressions.
// see: https://docs.angularjs.org/guide/forms
app.directive('formValidationError', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            scope.$watch(attrs['formValidationError'], function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('formValidationError', errorMsg ? false : true);
            });
        }
    };
});