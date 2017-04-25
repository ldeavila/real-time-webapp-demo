import Rx from 'rxjs';
import Chart from 'chart.js';

export default dashboardController

function dashboardController($scope) {
    let vm = this;

    vm.message = 'Dashboard';

    //TODO: Make this a directive
    const barChartSales = renderChart('bar-chart-sales', 'Count');
    const barChartInventory = renderChart('bar-chart-inventory', 'Total $ Value');

    Rx.Observable
        .create(create)
        .skip(1)
        .map(parseData)
        .map(hasM)
        .map(hasA)
        .subscribe(onNext, onError, onComplete);

    /////////

    function create(observer) {
        const eventSource = new EventSource('http://aleatablesweb.azurewebsites.net/inventory-signalr/hubs/connect?transport=serverSentEvents&clientProtocol=1.5&connectionToken=Lm8JRd3Su6xZkd9yE9xz0nzz4SKu7DoOwy9MyWOGffTw4%2FshNppwJ%2Fxj2pqU3sSF7sf2iCN36nm%2B%2BqMhdkXwyyHwIyao2Bee8HhC4ic5is5nbhUQb3xDIxB1%2BVaciqoL&connectionData=%5B%7B%22name%22%3A%22inventoryhub%22%7D%5D&tid=0');
        eventSource.onmessage = x => observer.next(x);
        eventSource.onerror = x => observer.error(x, 'error');

        return () => {
            eventSource.close();
        };
    }

    function onNext(data) {
        if (data) {
            barChartSales.data.datasets[0].data[0] = data[1];
            barChartSales.data.datasets[0].data[1] = data[2];

            barChartInventory.data.datasets[0].data[0] = data[3];
            barChartInventory.data.datasets[0].data[1] = data[4];

            barChartSales.update();
            barChartInventory.update();

            vm.date = data[0];
            $scope.$apply();
        }
    }

    function onError(err) {
        console.error(err)
    }

    function onComplete() {
        console.log('done');
    }

    function parseData(response) {
        return JSON.parse(response.data);
    }

    function hasM(data) {
        if (data.M) {
            return data.M[0];
        }
    }

    function hasA(M) {
        if (M) {
            return M.A;
        }
    }

    function renderChart(elementId, label) {
        const ctx = document.getElementById(elementId);
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Inventory', 'Orders'],
                datasets: [{
                    label: label,
                    data: [0, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}
