function formController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.inputs = [];
    ctrl.changeForm = false;

    ctrl.fillInputs = function (type) {
        switch (type) {
            case "connection":
                ctrl.inputs.push({name: "email", type: "email"});
                ctrl.inputs.push({name: "password", type: "password"});
                ctrl.changeForm = true;
                ctrl.button = "sign up";
                break;
            case "inscription":
                ctrl.inputs.push({name: "name", type: "text"});
                ctrl.inputs.push({name: "surname", type: "text"});
                ctrl.inputs.push({name: "age", type: "number"});
                ctrl.inputs.push({name: "address", type: "text"});
                ctrl.inputs.push({name: "city", type: "text"});
                ctrl.changeForm = false;
                ctrl.button = "sign in";
                break;
            default:
                break;
        }
        ctrl.ftype = type;
    }

    ctrl.sendData = function (sender) {
        alert(ctrl.changeForm);
        // TODO: Use the chosen function
    }

    ctrl.change = function () {
        ctrl.inputs = [];
        if (ctrl.changeForm) {
            ctrl.ftype = "inscription";
        } else {
            ctrl.ftype = "connection";
        }
        ctrl.fillInputs(ctrl.ftype);
    }

    ctrl.$onInit = function () {
        ctrl.fillInputs(ctrl.ftype);
    }
}

componentApp.component("formApp", {
    bindings: {
        ftype: '@'
    },
    templateUrl: "components/form/form.html",
    controller: formController
});