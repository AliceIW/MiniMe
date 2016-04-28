/**
 * Created by alice on 20/04/2016.
 */
describe('MiniMe', function () {
    describe('Debug Service', function () {
        var debug = null;
        beforeEach(function () {
            MiniMe.run(false);
            debug = MiniMe.get('Debug');
        });
        it('It should initialise the Debug correctly', function () {
            expect(debug.className).toBe('Debug');
        });
        it('It shouldn\'t show any debug message with debug off', function () {
            console.log = jasmine.createSpy("log");
            debug.log('I\'m Logging This');
            expect(console.log).not.toHaveBeenCalled();
        });
        describe('Altered Methods', function () {
            beforeEach(function () {
                MiniMe.run(true);
                debug = MiniMe.get('Debug');
            });
            it('It should call the console.log correctly', function () {
                console.log = jasmine.createSpy("log");
                debug.log('I\'m Logging This');
                expect(console.log).toHaveBeenCalledWith('I\'m Logging This');
            });
            it('It should call the console.info correctly', function () {
                console.info = jasmine.createSpy("info");
                debug.info('I\'m Logging This');
                expect(console.info).toHaveBeenCalledWith('I\'m Logging This');
            });
            it('It should call the console.warn correctly', function () {
                console.warn = jasmine.createSpy("warn");
                debug.warn('I\'m Logging This');
                expect(console.warn).toHaveBeenCalledWith('I\'m Logging This');
            });
            it('It should call the console.error correctly', function () {
                console.error = jasmine.createSpy("error");
                debug.error('I\'m Logging This');
                expect(console.error).toHaveBeenCalledWith('I\'m Logging This');
            });
            it('It should colour the message in the bracket', function () {
                console.log = jasmine.createSpy("log");
                debug.log('I\'m {Logging} This');
                expect(console.log).toHaveBeenCalledWith('I\'m %cLogging%c This', 'color:#0074D9;font-weight:bold', '');
            });
        });
        describe('Unaltered Methods', function () {
            beforeEach(function () {
                MiniMe.run(true);
                debug = MiniMe.get('Debug');
            });
            it('It should call the unaltered method', function () {
                var tableData = [
                    {
                        a: 0,
                        b: 1
                    },
                    {
                        a: 1,
                        b: 2
                    }
                ];
                console.table = jasmine.createSpy("table");
                debug.table(tableData);
                expect(console.table).toHaveBeenCalledWith(tableData);
            });
        });
    });
    describe('MiniMe App', function () {
        it('It should have version 1.0.0', function () {
            expect(MiniMe.version).toBe('1.0.0');
        });
        describe('Config', function () {
            it('It should not execute defined configuration if .run is not called', function () {
                var test = false;
                MiniMe.config(function () {
                    test = true;
                });
                expect(test).toBe(false);
            });
            it('It should execute defined configuration if .run is called', function () {
                var test = false;
                MiniMe.config(function () {
                    test = true;
                });
                MiniMe.run();
                expect(test).toBe(true);
            });
        });
        describe('Service', function () {
            it('It should add a service', function () {
                MiniMe.service('TestService', function () {
                    return {
                        hello: function () {
                            return true;
                        }
                    }
                });
                expect(MiniMe.get('TestService').hello()).toBe(true);
            });
            it('It shouldn\nt Initialise a service if execute is set to false', function () {
                MiniMe.service('TestService', function () {
                    return function () {

                    }
                }, false);
                expect(typeof MiniMe.get('TestService')).toBe('function');
            });

            it('It should if present, pass the parameters correctly', function () {
                MiniMe.service('TestService', function () {
                    return function (testValue1, testValue2) {
                        this.returnConstructValues = function () {
                            return [
                                testValue1,
                                testValue2
                            ];
                        }
                    }
                });
                expect(MiniMe.get('TestService', '1', {}).returnConstructValues()).toEqual(['1', {}]);
            });
        });
        describe('Controller', function () {
            it('It should initialise the controller if present in the current dom', function () {
                var controllerInit =false;
                MiniMe.controller('TestController', function () {
                    controllerInit=true;
                });
                MiniMe.run(false);
                expect(controllerInit).toBe(true);
            });
            it('It shouldn\nt Initialise the controller if not present in the current dom', function () {
                var controllerInit =false;
                MiniMe.controller('NonExistant', function () {
                    controllerInit=true;
                });
                MiniMe.run(false);
                expect(controllerInit).toBe(false);
            });
            it('It should add the event',function(){
                var eventTriggered = false;
                MiniMe.controller('TestController', function () {
                    this.addEvent('#hello','click',function(){
                        eventTriggered = true;
                    });
                });
                MiniMe.run(false);
                $('#hello').trigger( "click" );
                
                expect(eventTriggered).toBe(true);
            });
        });
    });
});