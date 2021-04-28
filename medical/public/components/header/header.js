function headerController($scope, $window) {
    var ctrl = this;

    ctrl.pages = [];

    ctrl.$onInit = function () {
        if (ctrl.usertype == "paciente") {
            ctrl.pages.push("cuenta");
            ctrl.pages.push("peticion");
            ctrl.pages.push("respuesta");
        } else if (ctrl.usertype == "medico") {
            ctrl.pages.push("cuenta");
            ctrl.pages.push("consulta");
        }
        $scope.currentNavItem = ctrl.page;
    }

    ctrl.goto = function (page) {
        $window.location.href = "/" + page;
    };
}

componentApp.component("headerApp", {
    bindings: {
        usertype: '@',
        page: '@'
    },
    templateUrl: "components/header/header.html",
    controller: headerController
});