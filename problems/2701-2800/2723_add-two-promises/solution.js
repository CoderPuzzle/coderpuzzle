// Promise.all subscribes to both inputs the moment it is called, so the
// two settlements stay concurrent: a slow first promise never delays
// attachment of the second one's handler, and the combined callback fires
// right after the slower fulfillment hop. The destructured pair is added
// in exactly one place, and the returned promise resolves with that sum —
// its own timing is irrelevant to the problem.
function addTwoPromises(promise1, promise2) {
    return Promise.all([promise1, promise2]).then(([a, b]) => a + b);
}

class Solution {
    run(driver) {
        return driver.drive(addTwoPromises);
    }
}
