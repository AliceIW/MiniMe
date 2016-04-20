# MiniMe Js

MiniMe was born out of necessity to keep my jquery code more organised.

# Defining Configuration

```javascript
app.configuration(function(){
    //Code that need to be executed when you initialise MiniMe
});
```

# Defining Controllers
```javascript
app.controller('MyNewController',function(constructParams){
    //Your Controllers Function
});
```

# Defining Services

```javascript
app.service('MyNewService',function(){
      return function (constructParams) {
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

**Resolve:** *|Boolean|* by default set to true it will tell to MiniMe if you want to execute the return function on init. 

# Todo

- Replace .forEach with for
- Write Jasmine Test
- Adding more option to the debug object