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
function cancellable(generator: Generator): [() => void, Promise<unknown>] {
    // Declared out here so the cancel closure keeps reaching it after the
    // executor's synchronous run assigns it.
    let step: ((method: "next" | "throw", argument?: unknown) => void) | null = null;
    const promise = new Promise<unknown>((resolve, reject) => {
        let settled = false;
        // Assigned here, read later by the cancel closure below.
        step = (method: "next" | "throw", argument?: unknown): void => {
            if (settled) return;
            let outcome: IteratorResult<unknown>;
            try {
                outcome = (generator[method] as (argument?: unknown) => IteratorResult<unknown>)(argument);
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
    return [() => step!("throw", "Cancelled"), promise];
}

class Solution {
    run(cancellableCase: CancellableCase) {
        return cancellableCase.drive(cancellable);
    }
}
