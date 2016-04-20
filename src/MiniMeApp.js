/**
 * Created by alice on 10/01/2016.
 *
 * Simple Jquery Framework that will allow to have a neater code.
 */
function MiniMeApp() {
    "use strict";
    var controllerFunctions = {};
    var configFunctions = [];
    var serviceFunctions = {};

    /**
     * Execute the configuration declared before
     */
    function runConfigurations() {
        MiniMe.get('Debug').info("Running Configuration");
        configFunctions.forEach(function (configFunc) {
            configFunc();
        });
    }

    /**
     * Takes the controllers and execute them
     */
    function searchAndExecuteControllers() {
        var controllersInPage = $('[data-controller]');
        controllersInPage.each(function (i,selector) {
            var currentController = $(selector).data('controller');
            if (typeof currentController !== 'undefined' && currentController in controllerFunctions) {
                MiniMe.get('Debug').info("Running Controller: {" + currentController + '}');
                addControllersFunctions(controllerFunctions[currentController], currentController);
                var params = $(selector).data('controller-params') || {};

                controllerFunctions[currentController].call(controllerFunctions[currentController], params);
            }
        });
    }

    /**
     * Add a the addEvent function and controller name variable
     * @param ctrl
     * @param currentController
     */

    function addControllersFunctions(ctrl, currentController) {
        ctrl.PVT_controllerName = currentController;
        ctrl.addEvent = function (el, event, fnc) {
            if ($.type(fnc) === 'string') {
                fnc = this[fnc];
            }
            MiniMe.get('Debug').info("     Adding Event:  {" + event + '} on {' + el + '}');
            $('[data-controller="' + this.PVT_controllerName + '"] ').on(event, el, fnc);
            return this;
        };
    }


    /**
     * add Configuration
     *
     * @param func
     * @returns {addConfiguration}
     */
    function addConfiguration(func) {
        configFunctions.push(func);
    }

    /**
     * Run The Framework
     */
    function run(debugStatus) {
        var dbg = debugStatus || false;
        addService('Debug', new Debug(dbg));
        runConfigurations();
        searchAndExecuteControllers();
    }

    /**
     * Instantiate a new Controller
     *
     * @param name
     * @param func
     * @returns {addController}
     */
    function addController(name, func) {
        controllerFunctions[name] = func;
    }

    /**
     * Instantiate a new Service
     *
     * @param name
     * @param func
     * @returns {addService}
     */
    function addService(name, func, init) {
        var resolve = typeof init === 'undefined';

        if ($.type(func) === 'function' && resolve === true) {
            serviceFunctions[name] = func();
        } else {
            serviceFunctions[name] = func;
        }
    }

    /**
     * Retrieve the selected service and initialise it if needed
     *
     * @param name
     * @returns {*}
     */
    function getService(name) {
        var args = Array.prototype.slice.call(arguments);

        if ($.type(serviceFunctions[name]) === 'function') {
            return new serviceFunctions[name](args.slice(1));
        }
        return serviceFunctions[name];
    }

    return {
        version: '1.0.0',
        service: addService,
        get: getService,
        controller: addController,
        config: addConfiguration,
        run: run
    };
}

 var MiniMe = new MiniMeApp();