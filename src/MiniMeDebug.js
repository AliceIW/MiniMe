/**
 * Created by alice on 21/01/2016.
 *
 * Debug Service
 */

function Debug(debugStatus) {
    var enableDebug = debugStatus || false;
    this.log = function () {
        var newArguments = colourise(arguments);

        if (newArguments == null) {
            newArguments = arguments;
        }
        if (enableDebug) {
            console.info.apply(console, newArguments);
        }
    }

    this.info = function () {
        var newArguments = colourise(arguments);

        if (newArguments == null) {
            newArguments = arguments;
        }
        if (enableDebug) {
            console.info.apply(console, newArguments);
        }
    };

    function colourise(arguments) {
        var message = arguments[0];
        var newArgumentsArray = [""];
        var matches = message.match(/{(.*?)}/g);
        if (matches === null) {
            return null;
        }
        matches.forEach(function (match) {
            message = message.replace(match, '%c' + match.substr(1, match.length - 2) + '%c');
            newArgumentsArray.push('color:#0074D9;font-weight:bold');
            newArgumentsArray.push('')
        });
        newArgumentsArray[0] = message;

        return newArgumentsArray;
    }
};
