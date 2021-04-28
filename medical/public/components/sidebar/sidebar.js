function sidebarController($scope, $mdSidenav, $http, $window) {
    var ctrl = this;

    ctrl.toggleBar = barToggler('menuButton');

    function barToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    }

    ctrl.signOut = function () {
        $http.post("/signout")
            .then(function (response) {
                if (response.data === "wrong") {
                    console.log(response);
                } else {
                    $window.location.href = response.data.redirect;
                }
            }, function (response) {
                console.log(response);
            });
    }
}

componentApp.component("sidebar", {
    bindings: {
        name: '@'
    },
    templateUrl: "components/sidebar/sidebar.html",
    controller: sidebarController
});