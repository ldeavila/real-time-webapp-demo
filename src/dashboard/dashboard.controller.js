import Rx from 'rxjs';
import Chart from 'chart.js';

function dashboardController($scope) {
    let vm = this;

    vm.message = 'Dashboard';

    const ctx = document.getElementById('bar-chart-sales');
    const barChartSales = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cookies', 'Drinks', 'Snack Bar'],
            datasets: [{
                label: 'Total Sales',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
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

    // subscription
    Rx.Observable
        .interval(1000)
        .take(10)
        .map(() => {
            return [
                Math.floor(Math.random() * 5) + 1,
                Math.floor(Math.random() * 5) + 1,
                Math.floor(Math.random() * 5) + 1
            ];
        })
        .subscribe((counter) => {
            barChartSales.data.datasets[0].data[0] = barChartSales.data.datasets[0].data[0] + counter[0];
            barChartSales.data.datasets[0].data[1] = barChartSales.data.datasets[0].data[1] + counter[1];
            barChartSales.data.datasets[0].data[2] = barChartSales.data.datasets[0].data[2] + counter[2];

            barChartSales.update();
            $scope.$apply();
        });
}

export default dashboardController