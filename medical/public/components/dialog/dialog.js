function dialogController($scope, $mdDialog, $http, $window, diagdata) {
    $scope.item = diagdata;
    $scope.files = [];

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.send = function () {
        $scope.files = document.getElementById('file').files;
        var formInfo = new FormData();
        formInfo.append("data", angular.toJson($scope.item));
        for (let i = 0; i < $scope.files.length; i++) {
            formInfo.append("file" + i, $scope.files[i]);
        }
        $http.post("/registerReport", formInfo, {
            headers: {
                'Content-Type': undefined
            }
        })
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log("Unable to send your request. Please come later");
                } else {
                    $mdDialog.cancel();
                    $window.location.reload();
                }
            }, function (response) {
                console.log("Unable to send your request. Please come later");
                $mdDialog.cancel();
            });
    };
}
/*
componentApp.component("dialog", {
    bindings: {
        title: '@'
    },
    templateUrl: "components/dialog/dialog.html",
    controller: dialogController
});*/