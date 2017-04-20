function appRoutes($routeProvider) {
    $routeProvider
        .when('/dashboard', {
            templateUrl: './dashboard/dashboard.html',
            controller: 'dashboardController',
            controllerAs: 'vm'
        })
        .when('/inventory', {
            templateUrl: './inventory/inventory.html',
            controller: 'inventoryController',
            controllerAs: 'vm'
        })
        .when('/shopping-cart', {
            templateUrl: './shopping-cart/shopping-cart.html',
            controller: 'shoppingCartController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
}

export default appRoutes;