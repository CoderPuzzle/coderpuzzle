// timeLimit(fn, t) hands back a wrapper that captures t; each call to
// the wrapper starts fn immediately (so an immediate rejection or a
// synchronous throw claims the race the moment it happens) and returns
// a brand-new promise in which a timer scheduled for exactly t rejects
// with "Time Limit Exceeded". Whichever settles first wins — Promise
// semantics make the second settlement call a no-op, so no extra
// bookkeeping is needed to decide the winner — and both handlers route
// into that single promise's resolve/reject pair.
function timeLimit(fn: (...args: unknown[]) => unknown, t: number): (...args: unknown[]) => Promise<unknown> {
    return function (...args: unknown[]) {
        return new Promise<unknown>((resolve, reject) => {
            setTimeout(() => reject("Time Limit Exceeded"), t);
            (fn(...args) as Promise<unknown>).then(resolve, reject);
        });
    };
}

class Solution {
    run(limitCase: LimitCase) {
        return limitCase.drive(timeLimit);
    }
}
