// delayAll(functions, ms) maps each promise-returning fn to a wrapper
// that captures it plus the delay; a call forwards its arguments, then
// routes the returned promise's fulfillment and rejection into one fresh
// promise whose settle side arms setTimeout for exactly ms more — so
// every delayed promise settles at (its own settle time) + ms, keeping
// resolution and rejection equally delayed.
function delayAll(functions, ms) {
    return functions.map(
        (fn) =>
            (...args) =>
                new Promise((resolve, reject) => {
                    fn(...args)
                        .then((value) => setTimeout(() => resolve(value), ms))
                        .catch((reason) => setTimeout(() => reject(reason), ms));
                }),
    );
}

class Solution {
    run(delayCase) {
        return delayCase.drive(delayAll);
    }
}
