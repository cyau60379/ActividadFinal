function mapsController($scope, $http) {
    var ctrl = this;

    ctrl.pts = [];

    ctrl.$onInit = function () {
        $http.post("/getAddresses")
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log("Error: data not found");
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        var url = "https://api.opencagedata.com/geocode/v1/json?q=" + response.data[i].domicilio + "&key=4fc39057a3344786a7ee716f0c7b0213";
                        $http.get(url)
                            .then(function (response) {
                                var latitude = response.data.results[0]["geometry"]["lat"];
                                var longitude = response.data.results[0]["geometry"]["lng"];
                                ctrl.pts.push({lat: latitude, lng: longitude});
                            }, function (response) {
                                console.log(response);
                            });
                    }
                }
            }, function (response) {
                console.log("Error: data not found");
            });
    }
}

componentApp.component("maps", {
    bindings: {
    },
    templateUrl: "components/maps/maps.html",
    controller: mapsController
});
