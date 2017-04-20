import angular from 'angular';
import angularRoute from 'angular-route';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import css from './styles/app.styles.css';
import ie10 from './styles/ie10-viewport-bug-workaround.css'

import appRoutes from './app.routes';

import dashboardController from "./dashboard/dashboard.controller";
import inventoryController from "./inventory/inventory.controller";
import shoppingCartController from "./shopping-cart/shopping-cart.controller";

angular
    .module('app', ['ngRoute'])
    .config(appRoutes)
    .controller('dashboardController', dashboardController)
    .controller('inventoryController', inventoryController)
    .controller('shoppingCartController', shoppingCartController);
