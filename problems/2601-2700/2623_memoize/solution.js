// One cache keyed by the serialized argument list answers every call
// before the underlying function is ever touched: first sight computes
// through to the real fn and stores the result; every later call with the
// same arguments short-circuits to that value. JSON.stringify keeps the
// arguments in order inside the key, which is exactly why sum treats
// (2,3) and (3,2) as two entries while repeats never recount.
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

class Solution {
    run(memoizeCase) {
        memoizeCase.drive(memoize);
    }
}
