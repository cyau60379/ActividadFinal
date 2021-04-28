var componentApp = angular.module('componentApp', ['ngMaterial', 'ngMessages', 'ngRoute']);

componentApp.config(function ($mdIconProvider) {
    // Add icon in the mdIconProvider with the identifier to be used in md-svg-icon
    // will load by url and retrieve the data via the $templateRequest
    $mdIconProvider
        .icon('logo', 'images/logo.svg', 50)
        .icon('left-arrow', 'images/left.svg', 50)
        .icon('right-arrow', 'images/right.svg', 50);
})
    .run(function ($templateRequest) {
        var urls = [
            'images/logo.svg',
            'images/left.svg',
            'images/right.svg',
        ];

        // Pre-fetch icons sources by URL and cache in the $templateCache...
        // subsequent $templateRequest calls will look there first.
        angular.forEach(urls, function (url) {
            $templateRequest(url);
        });
    });