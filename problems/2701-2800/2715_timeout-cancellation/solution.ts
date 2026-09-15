// cancellable schedules exactly one delayed execution and hands back a
// cancel function that clears that pending timer. Whatever arguments were
// supplied are captured once and spread into fn when — and only when —
// the delay elapses uncanceled. clearTimeout on an already-fired or
// already-cleared handle is a harmless no-op, so late or repeated cancel
// invocations change nothing.
type CancelFn = () => void;

function cancellable(fn: (...args: any[]) => unknown, args: any[], t: number): CancelFn {
    // The judge's virtual clock hands out numeric handles.
    const timerId: number = setTimeout(() => {
        fn(...args);
    }, t);
    return (): void => {
        clearTimeout(timerId);
    };
}

class Solution {
    run(timeoutCase: TimeoutCase): void {
        timeoutCase.drive(cancellable);
    }
}
