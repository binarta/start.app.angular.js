(function () {
    angular.module('binarta-checkpointjs-gateways-angular1', ['binarta-checkpointjs-rest-angular1'])
        .provider('binartaCheckpointGateway', ['restBinartaCheckpointGatewayProvider', proxy]);

    angular.module('binarta-gateways-angular1', ['binartajs-angular1', 'binarta-checkpointjs-gateways-angular1'])
        .run(['$q', 'binartaGatewaysAreInitialised', 'binartaCheckpointGatewayIsInitialised', IsInitialised]);

    function proxy(gateway) {
        return gateway;
    }

    function IsInitialised($q, gatewaysAreInitialised, checkpointGateway) {
        $q.all(checkpointGateway.promise).then(function () {
            gatewaysAreInitialised.resolve();
        });
    }
})();
