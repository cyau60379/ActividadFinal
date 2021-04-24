function headerController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.pages = [];

    ctrl.$onInit = function () {
        if (ctrl.page == "paciente") {
            ctrl.pages.push("cuenta");
            ctrl.pages.push("peticion");
            ctrl.pages.push("respuesta");
        } else if (ctrl.page == "medico") {
            ctrl.pages.push("cuenta");
            ctrl.pages.push("consulta");
        }
    }

    ctrl.update = function (movie, rating) {
        ctrl.onUpdate({movie: movie, rating: rating});
    }

    $scope.currentNavItem = 'page1';

    $scope.goto = function (page) {
        $scope.status = "Goto " + page;
    };
}

componentApp.component("headerApp", {
    bindings: {
        page: '@'
    },
    templateUrl: "components/header/header.html",
    controller: headerController
});