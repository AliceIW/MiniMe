/**
 * Created by alice on 21/01/2016.
 *
 * Debug Service
 */

function Debug(debugStatus) {
    var enableDebug = debugStatus || false;

    this.log = function (message) {
        if (enableDebug) {
            console.log(message);
        }
    }
};
