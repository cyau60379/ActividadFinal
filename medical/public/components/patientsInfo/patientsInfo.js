function infoController($scope, $http) {
    var ctrl = this;

    ctrl.info = [];

    ctrl.$onInit = function () {
        $http.post("/getDiseases")
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log("Error: data not found");
                } else {
                    ctrl.info = response.data;
                }
            }, function (response) {
                console.log("Error: data not found");
            });
    }
}

componentApp.component("info", {
    bindings: {
    },
    templateUrl: "components/patientsInfo/patientsInfo.html",
    controller: infoController
});
