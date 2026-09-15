// Every function is called immediately, so all promises run in parallel;
// each one gets both a fulfillment and a rejection handler attached up
// front, which is what keeps every rejection individually caught (and the
// aggregate itself always fulfilled). Results are written at their own
// index, so settlement order can never shuffle them, and the pending
// counter resolves the aggregate exactly when the last promise settles —
// an empty input short-circuits to [] before anything is awaited.
function promiseAllSettled(functions) {
    return new Promise((resolve) => {
        const results = new Array(functions.length);
        let pending = functions.length;
        if (pending === 0) {
            resolve(results);
            return;
        }
        functions.forEach((fn, index) => {
            fn().then(
                (value) => {
                    results[index] = { status: "fulfilled", value };
                    if (--pending === 0) resolve(results);
                },
                (reason) => {
                    results[index] = { status: "rejected", reason };
                    if (--pending === 0) resolve(results);
                },
            );
        });
    });
}

class Solution {
    run(driver) {
        return driver.drive(promiseAllSettled);
    }
}
