// Call fn once immediately, then keep one repeating timer for all later
// executions. The returned closure captures that timer handle so cancellation
// stops the entire repeat chain without affecting calls that already ran.
type CancelFn = () => void;

function cancellable(fn: (...args: any[]) => unknown, args: any[], t: number): CancelFn {
    fn(...args);
    const intervalId: number = setInterval(() => {
        fn(...args);
    }, t);
    return (): void => {
        clearInterval(intervalId);
    };
}

class Solution {
    run(intervalCase: IntervalCase): void {
        intervalCase.drive(cancellable);
    }
}
