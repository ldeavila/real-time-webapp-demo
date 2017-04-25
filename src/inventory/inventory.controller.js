export default inventoryController

function inventoryController($http) {
    const vm = this;

    vm.addInventoryItem = addInventoryItem;

    getInventory();

    //////////

    function getInventory() {
        $http({
            method: 'GET',
            url: 'http://aleatablesweb.azurewebsites.net/api/inventorysummary'
        })
            .then(onGetInventoryFulfilled, onRejection);
    }

    function addInventoryItem(item) {
        $http({
            method: 'POST',
            url: `http://aleatablesweb.azurewebsites.net/api/inventory`,
            data: item
        })
            .then(onAddInventoryItemFulfilled, onRejection);
    }

    function onAddInventoryItemFulfilled(response) {
        vm.items
            .map(function incrementItemCount(item) {
                if (item.Name === response.data.Name) {
                    item.Count++;
                }
            });
    }

    function onGetInventoryFulfilled(response) {
        vm.items = response.data;
    }

    function onRejection(response) {
        console.log(response);
    }
}
