type Callback = (value: unknown, error?: unknown) => void;

// The wrapped call returns a promise that hands fn a callback of our
// own: with no second argument the callback's first parameter resolves
// the promise, and any error passed as the second argument rejects with
// that error verbatim. The rest arguments forward the caller's plain
// args after the injected callback, so promisify never needs to know
// fn's arity.
function promisify(fn: (callback: Callback, ...args: unknown[]) => unknown): (...args: unknown[]) => Promise<unknown> {
    return function (...args: unknown[]): Promise<unknown> {
        return new Promise((resolve, reject) => {
            fn(
                (value: unknown, error?: unknown) => {
                    if (error !== undefined) {
                        reject(error);
                    } else {
                        resolve(value);
                    }
                },
                ...args,
            );
        });
    };
}

class Solution {
    run(driver: PromisifyDriver) {
        return driver.drive(promisify);
    }
}
