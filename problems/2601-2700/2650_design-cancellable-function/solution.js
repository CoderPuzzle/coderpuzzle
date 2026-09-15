// cancellable drives the generator over two channels: values resolved by
// yielded promises flow back through generator.next(value), and both
// promise rejections and the cancel signal flow through
// generator.throw(error). Everything routes through one stepper; wrapping
// only the raw generator call means an error thrown into a generator that
// never catches it lands here and rejects the returned promise, while a
// caught one keeps the loop going from the next yield. The settled flag
// freezes the fate after resolve/reject fires, so cancelling an already
// finished generator (Example 1) is inert instead of throwing into a done
// generator.
function cancellable(generator) {
    // Declared out here so the cancel closure keeps reaching it after the
    // executor's synchronous run assigns it.
    let step = null;
    const promise = new Promise((resolve, reject) => {
        let settled = false;
        step = (method, argument) => {
            if (settled) return;
            let outcome;
            try {
                outcome = generator[method](argument);
            } catch (thrown) {
                settled = true;
                reject(thrown);
                return;
            }
            if (outcome.done) {
                settled = true;
                resolve(outcome.value);
                return;
            }
            Promise.resolve(outcome.value).then(
                (value) => step("next", value),
                (error) => step("throw", error),
            );
        };
        step("next", undefined);
    });
    return [() => step("throw", "Cancelled"), promise];
}

class Solution {
    run(cancellableCase) {
        return cancellableCase.drive(cancellable);
    }
}
