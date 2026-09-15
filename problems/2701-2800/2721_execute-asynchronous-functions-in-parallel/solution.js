// Call every function immediately, so all promises run in parallel, and
// attach both a fulfillment and a rejection handler to each returned
// promise in that same synchronous pass — no promise is ever left without
// a rejection handler, and the very first rejection settles the aggregate
// right away (all later resolve/reject attempts on an already-settled
// promise are platform-level no-ops, so the first one inherently wins).
// Fulfillments write their value at the promise's own index, so settlement
// order can never shuffle the results, and a pending counter resolves the
// aggregate exactly when the last promise settles; an empty input
// short-circuits to [] before anything is awaited.
function promiseAll(functions) {
    return new Promise((resolve, reject) => {
        const results = new Array(functions.length);
        let pending = functions.length;
        if (pending === 0) {
            resolve(results);
            return;
        }
        functions.forEach((fn, index) => {
            fn().then(
                (value) => {
                    results[index] = value;
                    if (--pending === 0) resolve(results);
                },
                (reason) => reject(reason),
            );
        });
    });
}

class Solution {
    run(driver) {
        return driver.drive(promiseAll);
    }
}
