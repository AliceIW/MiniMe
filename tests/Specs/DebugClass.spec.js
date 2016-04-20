/**
 * Created by alice on 20/04/2016.
 */
describe('MiniMe', function () {
    var debug = null;
    beforeEach(function () {
        MiniMe.run(false);
        debug = MiniMe.get('Debug');
    });
    describe('Debug', function () {
        it('It should initialise the Debug correctly', function () {
            expect(typeof debug).toBe('object');
        });

    });
});