function dynamicFormController($scope, $http, $mdDialog, $window) {
    var ctrl = this;

    ctrl.inputs = [];
    $scope.updating = false;
    $scope.datos = {};
    $scope.enabled = false;


    ctrl.fillInputs = function (type) {
        switch (type) {
            case "update":
                $http.post("/getInfo")
                    .then(function (response) {
                        if (response.data === "wrong") {
                            console.log("Error: data not found");
                        } else {
                            ctrl.inputs.push([{name: "email", type: "text", value: response.data.email, flex: 100}]);
                            ctrl.inputs.push([{name: "password", type: "password", value: "", flex: 50},{name: "confirmation", type: "password", value: "", flex: 50}]);
                            ctrl.inputs.push([{name: "name", type: "text", value: response.data.name, flex: 50}, {name: "surname", type: "text", value: response.data.surname, flex: 50}]);
                            ctrl.inputs.push([{name: "sex", type: "text", value: response.data.sex, flex: 50}, {name: "age", type: "number", value: response.data.age, flex: 50}]);
                            ctrl.inputs.push([{name: "address", type: "text", value: response.data.address, flex: 50}, {name: "city", type: "text", value: response.data.city, flex: 50}]);
                            ctrl.button = "modify";
                            for (let i = 0; i < ctrl.inputs.length; i++) {
                                for (let j = 0; j < ctrl.inputs[i].length; j++) {
                                    $scope.datos[ctrl.inputs[i][j].name] = ctrl.inputs[i][j].value;
                                }
                            }
                        }
                    }, function (response) {
                        console.log("Error: data not found");
                    });
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
            case "update":
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

    ctrl.showAlert = function (title, content, ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(content)
                .ariaLabel('Alert')
                .ok('Return')
                .targetEvent(ev)
        ).then(function () {
            $window.location.reload();
        });
    };

    ctrl.sendData = function ($event) {
        switch (ctrl.ftype) {
            case "update":
                $http.post("/update", JSON.stringify({
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
                            ctrl.showAlert("Error", "Unable to update your data. Please come later", $event);
                        } else {
                            ctrl.change();
                            ctrl.showAlert("Update", "Done", $event);
                        }
                    }, function (response) {
                        ctrl.showAlert("Error", "Unable to update your data. Please come later", $event);
                    });
                break;
        }
    }

    ctrl.change = function () {
        $scope.updating = !$scope.updating;
    }

    ctrl.$onInit = function () {
        ctrl.fillInputs(ctrl.ftype);
    }
}

componentApp.component("dynamicForm", {
    bindings: {
        ftype: '@'
    },
    templateUrl: "components/dynamicForm/dynamicForm.html",
    controller: dynamicFormController
});