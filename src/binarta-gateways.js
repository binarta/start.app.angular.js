(function () {
    angular.module('binarta-applicationjs-gateways-angular1', ['binarta-applicationjs-rest-angular1'])
        .provider('binartaApplicationGateway', ['restBinartaApplicationGatewayProvider', proxy]);
    
    angular.module('binarta-checkpointjs-gateways-angular1', ['binarta-checkpointjs-rest-angular1'])
        .provider('binartaCheckpointGateway', ['restBinartaCheckpointGatewayProvider', proxy]);

    angular.module('binarta-gateways-angular1', [
        'binartajs-angular1', 
        'binarta-applicationjs-gateways-angular1', 
        'binarta-checkpointjs-gateways-angular1'
    ])
        .run([
            '$q', 
            'binartaGatewaysAreInitialised', 
            'binartaApplicationGatewayIsInitialised', 
            'binartaCheckpointGatewayIsInitialised', 
            IsInitialised
        ]);

    function proxy(gateway) {
        return gateway;
    }

    function IsInitialised($q, gatewaysAreInitialised, applicationGateway, checkpointGateway) {
        $q.all([applicationGateway.promise, checkpointGateway.promise]).then(gatewaysAreInitialised.resolve);
    }
})();
