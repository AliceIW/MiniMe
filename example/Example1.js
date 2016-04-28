/**
 * Created by alice on 21/01/2016.
 */
MiniMe.service('Test', function () {
    return function (tt) {
        this.test = function () {

        }
    };

});
MiniMe.config(function () {

});
MiniMe.controller('InputChange', function (parameters) {

    MiniMe.get('Debug').info([{a:1},{v:2}],'{saddads}');

    MiniMe.get('Test', 'ttt').test();

    this.addEvent('#test', 'keyup', function () {
        console.log('ddd');
        var value = $(this).val();
        $('#youWrote').html(value);
    });
    this.addEvent('#test2', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });

});
MiniMe.controller('FatherController', function () {
    this.addEvent('#test2', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
});
MiniMe.controller('AnotherController', function () {
    this.addEvent('#test2', 'keyup', function () {
        var value = $(this).val();
        $('#youWrote').html(value);
    });
});

MiniMe.run(true);