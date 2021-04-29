function dialogController($scope, $mdDialog, diagdata) {
    $scope.item = diagdata;

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
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