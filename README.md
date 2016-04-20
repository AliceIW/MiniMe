# MiniMe Js

MiniMe was born out of a necessity to keep my jquery code more organised.


# Configuration
The configurations are always executed first, you can put the events here that are not bound to a specific controller.
(I strongly suggest using a proper controller, but if you have to work with lots of legacy code)

**Definition**
```javascript
app.configuration(function(){
    //Code that needs to be executed when you initialise MiniMe
});
```

# Controllers
Controllers should always be as slim as possible, only the logic should be defined here.

#### Definition
```javascript
app.controller('MyNewController',function(constructParams){
    //Your Controller Function
});
```

#### Reserved Functions

***AddEvent*** 
This will add a new event and bind it to the controller scope.

```javascript
this.addEvent(element,event,function(){
    
});
```

#### Using controllers in the frontend
```html
<div class="some-div" data-controller="myController" data-controller-params="{\"json\":true}">

</div>
```

**data-controller** *|String|* Which controller will manage all the events inside the div.
**data-controller-params** *|Json|*  Optional. Additional parameters that can be passed to the controller 



# Services
I love services, all the servicey stuff and the *heavy stuff* should be put in here.

#### Definition
```javascript
app.service('MyNewService',function(){
      return function (constructParam1,constructParam2) {
            this.log = function (logExample) {
                console.log(logExample);
            }
        };
},Resolve);

```
Or

```javascript
app.service('MyNewService',function(){
      return {
            log:function(){
               console.log(logExample);
            }
         ;}
});
```

**Resolve:** *|Boolean|* by default set to true it will tell MiniMe if you want to execute the return function on initialisation.

#### Retrieving a service
***app.get()***

```javascript
    app.get(ServiceName,args...)
```   

# Initialising Minime
Just call at the end, after all the definitions
```javascript
    app.run(debug)
```   

**Debug** *|Boolean|* If you need to debug MiniMe.


# Built-in Services

###### Debug Service *(In Progress)*
It's a wrapper class for the console command. Use the Brackets to highlight the text inside (it will become bold and blue).

```javascript
    app.get('Debug').log("This is my {Text}");
```


# Todo
- Replace .forEach with for
- Write Jasmine Test
- Adding more option to the debug object