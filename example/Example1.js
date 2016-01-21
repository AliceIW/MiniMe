/**
 * Created by alice on 21/01/2016.
 */
app.service('Test', function () {
    return function (tt) {
        this.test = function () {
            console.log('service loaded' + tt)
        }
    };

});
app.config(function () {
});
app.controller('InputChange', function () {
    app.get('Test','ttt').test();
    app.addEvent('#test', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
});