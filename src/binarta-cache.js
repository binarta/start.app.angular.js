(function () {
    angular.module('binarta-cache-angular1', [
        'binarta-config-angular1'
    ])
        .run([
            '$q',
            'binartaCachesAreInitialised',
            'binartaApplicationCachesAreInitialised',
            IsInitialised
        ]);

    function IsInitialised($q, cachesAreInitialised, appCachesAreInitialised) {
        $q.all([appCachesAreInitialised]).then(cachesAreInitialised.resolve);
    }
})();
