function formController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.inputs = [];

    ctrl.$onInit = function () {
        if (ctrl.ftype == "connection") {
            ctrl.inputs.push({name: "email", type: "email"});
            ctrl.inputs.push({name: "password", type: "password"});
        } else if (ctrl.ftype == "inscription") {
            ctrl.inputs.push({name: "name", type: "text"});
            ctrl.inputs.push({name: "surname", type: "text"});
            ctrl.inputs.push({name: "age", type: "number"});
            ctrl.inputs.push({name: "address", type: "text"});
            ctrl.inputs.push({name: "city", type: "text"});
        } else {
            // TODO: add an object in bindings with the name and the type
        }
    }

    ctrl.sendData = function (sender) {
        // TODO: Use the chosen function
    }
}

componentApp.component("formApp", {
    bindings: {
        ftype: '@'
    },
    templateUrl: "components/form/form.html",
    controller: formController
});