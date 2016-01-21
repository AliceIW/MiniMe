/**
 * Created by alice on 10/01/2016.
 *
 * Simple Jquery Framework that will allow to have a neater code.
 */
function App() {
    "use strict";
    var controllerFunctions = {};
    var configFunctions = [];
    var serviceFunctions = {};

    /**
     * Execute the configuration declared before
     */
    function runConfigurations() {
        configFunctions.forEach(function (configFunc) {
            configFunc();
        });
    }

    /**
     * Takes the controllers and execute them
     */
    function searchAndExecuteControllers() {
        var controllersInPage = $('[data-controller]');
        controllersInPage.each(function (i, selector) {
            var controllerName = $(selector).data('controller');
            if (typeof controllerName !== 'undefined' && controllerName in controllerFunctions) {
                controllerFunctions[controllerName]();
            }
        })
    }

    /**
     *  Add an event to the specific controller
     *
     * @param el
     * @param event
     * @param fnc
     * @returns {addEventListener}
     */
    function addEventListener(el, event, fnc) {
        if ($.type(fnc) === 'string') {
            fnc = this[fnc];
        }
        $(el).on(event, fnc);
        return this;
    }

    /**
     * add Configuration
     *
     * @param func
     * @returns {addConfiguration}
     */
    function addConfiguration(func) {
        configFunctions.push(func);
        return this;
    }

    /**
     * Run The Framework
     */
    function run() {
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
        return this;
    }

    /**
     * Instantiate a new Service
     *
     * @param name
     * @param func
     * @returns {addService}
     */
    function addService(name, func) {
        serviceFunctions[name] = func();
        return this;
    }

    /**
     * Retrieve the selected service and initialise it if needed
     *
     * @param name
     * @returns {*}
     */
    function getService(name) {
        var args = Array.prototype.slice.call(arguments);

        if ($.type(serviceFunctions[name]) == 'function') {
            return new serviceFunctions[name](args.slice(1))
        }
        return serviceFunctions[name];
    }

    return {
        version: '0.0.1',
        service: addService,
        get: getService,
        controller: addController,
        addEvent: addEventListener,
        config: addConfiguration,
        run: run
    };
}

app = new App();