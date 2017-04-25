export default shoppingCartController

function shoppingCartController($http) {
    const vm = this;

    vm.buyItem = buyItem;

    getInventory();

    //////////

    function getInventory() {
        $http({
            method: 'GET',
            url: 'http://aleatablesweb.azurewebsites.net/api/inventory'
        })
            .then(onFulfilled, onRejected);

    }

    function buyItem(itemId) {
        $http({
            method: 'DELETE',
            url: `http://aleatablesweb.azurewebsites.net/api/inventory/${itemId}`
        })
            .then(onFulfilled, onRejected);
    }

    function onFulfilled(response) {
        vm.items = response.data;
    }

    function onRejected(response) {
        console.log(response)
    }
}