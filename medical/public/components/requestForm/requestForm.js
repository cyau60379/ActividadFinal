function requestFormController($scope, $http, $mdDialog, $window) {
    var ctrl = this;

    ctrl.inputs = [];
    $scope.datos = {};
    $scope.enabled = false;


    ctrl.fillInputs = function (type) {
        $http.post("/getInfo")
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log("Error: data not found");
                } else {
                    ctrl.inputs.push({id: "name", name: "name", type: "text", value: response.data.name, select: false, updatable: false});
                    ctrl.inputs.push({id: "surname", name: "surname", type: "text", value: response.data.surname, select: false, updatable: false});
                    ctrl.inputs.push({id: "sex", name: "sex", type: "text", value: response.data.sex, select: true, selectValue: ['H', 'M'], updatable: false});
                    ctrl.inputs.push({id: "age", name: "age", type: "number", value: response.data.age, select: false, updatable: false});
                    ctrl.inputs.push({id: "address", name: "address", type: "text", value: response.data.address, select: false, updatable: false});
                    ctrl.inputs.push({id: "city", name: "city", type: "text", value: response.data.city, select: false, updatable: false});
                    ctrl.inputs.push({id: "disease", name: "disease", type: "text", select: false, updatable: true});
                    ctrl.inputs.push({id: "images", name: "images", type: "file", select: false, updatable: true});
                    ctrl.inputs.push({id: "symptoms", name: "symptoms", type: "text", select: false, updatable: true});
                    ctrl.inputs.push({id: "duration", name: "duration(days)", type: "number", value: 0, select: false, updatable: true});
                    for (let i = 0; i < ctrl.inputs.length; i++) {
                        $scope.datos[ctrl.inputs[i].name] = ctrl.inputs[i].value;
                    }
                }
            }, function (response) {
                console.log("Error: data not found");
            });
        $scope.enabled = false;
        ctrl.ftype = type;
    }

    ctrl.enableButton = function () {
        $scope.datos.images = document.appForm.images.files;
        $scope.enabled = !(typeof $scope.datos.name == 'undefined'
            || typeof $scope.datos.surname == 'undefined'
            || typeof $scope.datos.age == 'undefined'
            || typeof $scope.datos.address == 'undefined'
            || typeof $scope.datos.sex == 'undefined'
            || typeof $scope.datos.disease == 'undefined'
            || typeof $scope.datos.symptoms == 'undefined'
            || typeof $scope.datos.duration == 'undefined'
            || typeof $scope.datos.images == 'undefined'
            || $scope.datos.sex.length > 1);
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
        );
    };

    ctrl.sendData = function ($event) {
        var formInfo = new FormData();
        var data = {
            disease: $scope.datos.disease,
            symptoms: $scope.datos.symptoms,
            duration: $scope.datos.duration,
        };
        formInfo.append("data", angular.toJson(data));
        for (let i = 0; i < $scope.datos.images.length; i++) {
            formInfo.append("image" + i, $scope.datos.images[i]);
        }
        $http.post("/request", formInfo, {
            headers: {
                'Content-Type': undefined
            }
        })
            .then(function (response) {
                if (response.data === "wrong") {
                    ctrl.showAlert("Error", "Unable to send your request. Please come later", $event);
                } else {
                    ctrl.showAlert("Request", "Done", $event);
                }
            }, function (response) {
                ctrl.showAlert("Error", "Unable to send your request. Please come later", $event);
            });
    }

    ctrl.$onInit = function () {
        ctrl.fillInputs(ctrl.ftype);
    }
}

componentApp.component("requestForm", {
    bindings: {
        ftype: '@'
    },
    templateUrl: "components/requestForm/requestForm.html",
    controller: requestFormController
});