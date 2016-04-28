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
        var controllersInPage = Aquery('[data-controller]');
        [].forEach.call(controllersInPage, function (selector) {
            var currentController = selector.getAttribute('data-controller');
            if (typeof currentController !== 'undefined' && currentController in controllerFunctions) {
                MiniMe.get('Debug').info("Running Controller: {" + currentController + '}');
                addControllersFunctions(controllerFunctions[currentController], currentController);
                var params = selector.getAttribute('data-controller-params') || {};
                controllerFunctions[currentController].call(controllerFunctions[currentController], params);
            }
        });
    }


    function Aquery(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Add a the addEvent function and controller name variable
     * @param ctrl
     * @param currentController
     */

    function addControllersFunctions(ctrl, currentController) {
        ctrl.PVT_controllerName = currentController;
        ctrl.addEvent = function (el, eventTrigger, fnc) {
            if (typeof fnc === 'string') {
                fnc = this[fnc];
            }
            MiniMe.get('Debug').info("     Adding Event:  {" + eventTrigger + '} on {' + el + '}');
            $('[data-controller="' + this.PVT_controllerName + '"] ').on(eventTrigger, el, fnc);

            // Aquery('[data-controller="' + this.PVT_controllerName + '"] ')[0]
            //     .addEventListener(eventTrigger, function (event) {
            //         if(Aquery(el)[0] == event.target){
            //             fnc();
            //         }
            //     });
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

        if (typeof func === 'function' && resolve === true) {
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

        if (typeof serviceFunctions[name] === 'function') {

            return new (Function.prototype.bind.apply(serviceFunctions[name], args));
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
/**
 * Created by alice on 21/01/2016.
 *
 * Debug Service
 */

function Debug(debugStatus) {
    "use strict";
    this.className='Debug';
    var enableDebug = debugStatus || false;

    /**
     * Initialise missing methods
     */
    for (var method in console) {
        if (typeof this[method] === 'function')
        {
            continue;
        }

        this[method] = (function (name,enableDebug) {
            return function (args) {
                if (!enableDebug) {
                    return;
                }
                console[name].call(console, args);
            };
        })(method,enableDebug);
    }
    
    this.log = function () {
        writeln('log', arguments);
    };

    this.info = function () {
        writeln('info', arguments);
    };

    this.warn = function () {
        writeln('warn', arguments);
    };

    this.error = function () {
        writeln('error', arguments);
    };

    /**
     * General function to print the string on the console
     * @param type
     * @param messages
     */
    function writeln(type, messages) {
        if (!enableDebug) {
            return;
        }
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];

            var newArguments = null;

            if (typeof message === 'string') {
                newArguments = colourise(message);
            }

            if (newArguments === null) {
                newArguments = [message];
            }

            console[type].apply(console, newArguments);

        }
    }

    /**
     * It will prepare the arguments to colour the string
     * @param args
     * @returns {*}
     */
    function colourise(message) {
        var newArgumentsArray = [""];
        var matches = message.match(/{(.*?)}/g);
        if (matches === null) {
            return null;
        }
        matches.forEach(function (match) {
            message = message.replace(match, '%c' + match.substr(1, match.length - 2) + '%c');
            newArgumentsArray.push('color:#0074D9;font-weight:bold');
            newArgumentsArray.push('');
        });
        newArgumentsArray[0] = message;

        return newArgumentsArray;
    }
}