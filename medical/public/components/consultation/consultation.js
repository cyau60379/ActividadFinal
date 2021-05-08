function consultationController($scope, $http, $mdDialog) {
    var ctrl = this;

    ctrl.consultations = [];

    ctrl.fillInputs = function () {
        $http.post("/getDiseasesInfo")
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log("Error: data not found");
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        $http.post("/getUsuarioFromDisease", JSON.stringify({
                            user: response.data[i].patient,
                        }))
                            .then(function (res) {
                                if (res.data === "wrong") {
                                    console.log("Error: data not found");
                                } else {
                                    ctrl.consultations.push({
                                        disease_id: response.data[i].disease_id,
                                        disease: response.data[i].disease,
                                        date: response.data[i].date.split("T")[0],
                                        patient_name: res.data.name,
                                        patient_age: res.data.age,
                                        patient_sex: res.data.sex,
                                        patient_address: res.data.address,
                                        status: response.data[i].status,
                                        statusmes: response.data[i].statusmes,
                                        response: response.data[i].response,
                                        resdate: response.data[i].resdate.split("T")[0],
                                        analysis: response.data[i].analysis,
                                        report_id: response.data[i].report_id,
                                    });
                                }
                            });
                    }
                }
            }, function (response) {
                console.log("Error: data not found");
            });
    }

    ctrl.showDetails = function (item, ev) {
        var analysis = [];
        if (item.analysis !== 'void') {
            for (let i = 0; i < item.analysis.length; i++) {
                analysis.push({
                    path: item.analysis[i],
                    name: "document" + item.analysis[i].split('.')[1],
                })
            }
        }
        console.log(item);
        $mdDialog.show({
            controller: dialogController,
            templateUrl: "components/dialog/consult.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            locals: {
                diagdata: {
                    disease_id: item.disease_id,
                    patient: {
                        name: item.patient_name,
                        age: item.patient_age,
                        sex: item.patient_sex,
                        address: item.patient_address,
                    },
                    response: item.response,
                    resdate: item.resdate,
                    analysis: analysis,
                    disease: item.disease,
                    report_id: item.report_id,
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

componentApp.component("consultation", {
    bindings: {
    },
    templateUrl: "components/consultation/consultation.html",
    controller: consultationController
});