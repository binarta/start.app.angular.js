(function () {
    angular.module('binarta-config-angular1', [
        'binarta-gateways-angular1'
    ])
        .run([
            '$q',
            'binartaConfigIsInitialised',
            'binartaApplicationConfigIsInitialised',
            IsInitialised
        ]);

    function IsInitialised($q, configIsInitialised, appConfigIsInitialised) {
        $q.all([appConfigIsInitialised]).then(configIsInitialised.resolve);
    }
})();
