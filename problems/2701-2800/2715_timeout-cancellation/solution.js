// cancellable schedules exactly one delayed execution and hands back a
// cancel function that clears that pending timer. Whatever arguments were
// supplied are captured once and spread into fn when — and only when —
// the delay elapses uncanceled. clearTimeout on an already-fired or
// already-cleared handle is a harmless no-op, so late or repeated cancel
// invocations change nothing.
function cancellable(fn, args, t) {
    const timerId = setTimeout(() => {
        fn(...args);
    }, t);
    return () => clearTimeout(timerId);
}

class Solution {
    run(timeoutCase) {
        timeoutCase.drive(cancellable);
    }
}
