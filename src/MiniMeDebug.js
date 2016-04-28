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