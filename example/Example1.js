/**
 * Created by alice on 21/01/2016.
 */
app.service('Test', function () {
    return function (tt) {
        this.test = function () {

        }
    };

});
app.config(function () {

});
app.controller('InputChange', function (parameters) {
    console.log(parameters);
    app.get('Test','ttt').test();
    this.addEvent('#test', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
    this.addEvent('#test2', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
});
app.controller('FatherController',function(){
    this.addEvent('#test2', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
});
app.controller('AnotherController',function(){
    this.addEvent('#test2', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
});

app.run(true);