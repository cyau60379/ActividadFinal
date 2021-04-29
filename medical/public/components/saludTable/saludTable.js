function saludTableController($scope, $http, $mdDialog, $window) {
    var ctrl = this;

    ctrl.responses = [];

    ctrl.fillInputs = function () {
        $http.post("/getResponse")
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log("Error: data not found");
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        ctrl.responses.push({
                            disease: response.data[i].disease,
                            date: response.data[i].date.split("T")[0],
                            status: response.data[i].status,
                            statusmes: response.data[i].statusmes,
                            response: response.data[i].res,
                            doctor: response.data[i].doctor,
                            resdate: response.data[i].resdate.split("T")[0],
                            analysis: response.data[i].analysis
                        });
                    }
                }
            }, function (response) {
                console.log("Error: data not found");
            });
    }

    ctrl.showDetails = function (item, ev) {
        var analysis = [];
        for (let i = 0; i < item.analysis.length; i++) {
            analysis.push({
                path: item.analysis[i],
                name: "document" + item.analysis[i].split('.')[1],
            })
        }
        $mdDialog.show({
            controller: dialogController,
            templateUrl: "components/dialog/dialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            locals: {
                diagdata: {
                    response: item.res,
                    doctor: item.doctor,
                    resdate: item.resdate,
                    analysis: analysis,
                    disease: item.disease
                }
            }
        }).then(function (answer) {
        }, function () {
        });
    };

    ctrl.$onInit = function () {
        ctrl.fillInputs();
    }
}

componentApp.component("saludTable", {
    bindings: {
        ftype: '@'
    },
    templateUrl: "components/saludTable/saludTable.html",
    controller: saludTableController
});