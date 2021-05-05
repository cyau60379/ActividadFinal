function accountInfoController($scope, $http) {
    var ctrl = this;
}

componentApp.component("accountInfo", {
    bindings: {
        name: '@'
    },
    templateUrl: "components/accountInfo/accountInfo.html",
    controller: accountInfoController
});
