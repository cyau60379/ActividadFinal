function formController($scope, $http, $mdDialog, $window) {
    var ctrl = this;

    ctrl.inputs = [];
    ctrl.changeForm = false;
    $scope.datos = {};
    $scope.enabled = false;


    ctrl.fillInputs = function (type) {
        switch (type) {
            case "connection":
                ctrl.inputs.push([{name: "email", type: "text", select: false, flex: 100}]);
                ctrl.inputs.push([{name: "password", type: "password", select: false, flex: 100}]);
                ctrl.changeForm = true;
                ctrl.button = "sign up";
                break;
            case "inscription":
                ctrl.inputs.push([{name: "email", type: "text", select: false, flex: 100}]);
                ctrl.inputs.push([
                    {name: "password", type: "password", select: false, flex: 50},
                    {name: "confirmation", type: "password", select: false, flex: 50}
                ]);
                ctrl.inputs.push([
                    {name: "name", type: "text", select: false, flex: 50},
                    {name: "surname", type: "text", select: false, flex: 50}
                ]);
                ctrl.inputs.push([
                    {name: "sex", type: "text", select: true, selectValue: ['H', 'M'], flex: 50},
                    {name: "age", type: "number", select: false, flex: 50}
                ]);
                ctrl.inputs.push([
                    {name: "address", type: "text", select: false, flex: 50},
                    {name: "city", type: "text", select: false, flex: 50}
                ]);
                ctrl.changeForm = false;
                ctrl.button = "sign in";
                break;
            default:
                break;
        }
        $scope.enabled = false;
        ctrl.ftype = type;
    }

    ctrl.enableButton = function () {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        switch (ctrl.ftype) {
            case "connection":
                if (typeof $scope.datos.password == 'undefined' || $scope.datos.password.length < 8) {
                    $scope.enabled = false;
                } else if ($scope.datos.password.length >= 8) {
                    $scope.enabled = $scope.datos.email.match(mailformat);
                }
                break;
            case "inscription":
                if (typeof $scope.datos.name == 'undefined'
                    || typeof $scope.datos.surname == 'undefined'
                    || typeof $scope.datos.age == 'undefined'
                    || typeof $scope.datos.address == 'undefined'
                    || typeof $scope.datos.city == 'undefined'
                    || typeof $scope.datos.password == 'undefined'
                    || typeof $scope.datos.confirmation == 'undefined'
                    || typeof $scope.datos.email == 'undefined'
                    || typeof $scope.datos.sex == 'undefined'
                    || $scope.datos.password.length < 8
                    || $scope.datos.sex.length > 1
                    || $scope.datos.password !== $scope.datos.confirmation) {
                    $scope.enabled = false;
                } else $scope.enabled = $scope.datos.email.match(mailformat);
                break;
        }
    }

    ctrl.showAlert = function (type, ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(type + ' failed')
                .textContent('Wrong data')
                .ariaLabel('Alert')
                .ok('Return')
                .targetEvent(ev)
        );
    };

    ctrl.sendData = function ($event) {
        switch (ctrl.ftype) {
            case "connection":
                $http.post("/connection", JSON.stringify({
                    email: $scope.datos.email,
                    password: $scope.datos.password
                }))
                    .then(function (response) {
                        if (response.data === "wrong") {
                            ctrl.showAlert(ctrl.ftype, $event);
                        } else {
                            $window.location.href = response.data.redirect;
                        }
                    }, function (response) {
                        ctrl.showAlert(ctrl.ftype, $event);
                    });
                break;
            case "inscription":
            // TODO: use $http to register the new patient + change page
                $http.post("/inscription", JSON.stringify({
                    email: $scope.datos.email,
                    password: $scope.datos.password,
                    name: $scope.datos.name,
                    surname: $scope.datos.surname,
                    sex: $scope.datos.sex,
                    age: $scope.datos.age,
                    address: $scope.datos.address,
                    city: $scope.datos.city
                }))
                    .then(function (response) {
                        if (response.data === "wrong") {
                            ctrl.showAlert(ctrl.ftype, $event);
                        } else {
                            $window.location.href = response.data.redirect;
                        }
                    }, function (response) {
                        ctrl.showAlert(ctrl.ftype, $event);
                    });
                break;
        }
    }

    ctrl.change = function () {
        ctrl.inputs = [];
        if (ctrl.changeForm) {
            ctrl.ftype = "inscription";
        } else {
            ctrl.ftype = "connection";
        }
        ctrl.fillInputs(ctrl.ftype);
    }

    ctrl.$onInit = function () {
        ctrl.fillInputs(ctrl.ftype);
    }
}

componentApp.component("formApp", {
    bindings: {
        ftype: '@'
    },
    templateUrl: "components/form/form.html",
    controller: formController
});