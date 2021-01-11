# Tiny promise stacking tool

Queue promises with this small-form-factor ES tool

## Like, how?

- First, get it `npm -i @vinq1911/promstack`
- Second, enqueue stuff

```javascript
const promStack = require('./index');

promStack.onStart = () => { console.log('starting stack'); return('started') };
promStack.onFinish = () => { console.log('finishing stack'); return('stopped') };

var idx = 0;
const enqueuable = (resolve, reject, input) => {
    idx++;
    console.log('input:',input);
    const random = Math.random()*5000;
    setTimeout(() => resolve(`resolved ${idx} after ${random}ms`), random);
}

setInterval(() => { promStack.enqueue(enqueuable) }, 2000);
```

- ?????
- PROFIT!

## Starters, stoppers?

- Modify scripts to run before / after: `promStack.onStart = () => {}` `promStack.onFinish = () => {}`. Starter and stopper can relay value to next in line.

