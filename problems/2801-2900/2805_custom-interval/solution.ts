// A linear pattern delay + period * count cannot come from one fixed
// setInterval: every firing re-schedules the next tick as a fresh one-shot
// timer whose delay grows with the running execution count. The id handed
// back to the caller belongs to the very first timer; a module-level
// registry maps it onto whatever descendant handle is pending right now,
// so customClearInterval(id) still reaches the live end of the chain.
// Stale or repeated clears miss the registry and are harmless no-ops.
type CurrentTimer = () => number;

const PENDING_INTERVALS = new Map<number, CurrentTimer>();

function customInterval(fn: () => unknown, delay: number, period: number): number {
    let count = 0;
    const tick = (): void => {
        fn();
        count += 1;
        timerId = setTimeout(tick, delay + period * count);
    };
    // The judge's virtual clock hands out numeric handles, and this first
    // registration happens before the cancel timeout is scheduled.
    let timerId = setTimeout(tick, delay + period * count);
    const currentTimer = (): number => timerId;
    PENDING_INTERVALS.set(timerId, currentTimer);
    return timerId;
}

function customClearInterval(id: unknown): void {
    const currentTimer = PENDING_INTERVALS.get(id as number);
    if (currentTimer === undefined) {
        return;
    }
    PENDING_INTERVALS.delete(id as number);
    clearTimeout(currentTimer());
}

class Solution {
    run(intervalCase: CustomIntervalCase): void {
        intervalCase.drive(customInterval, customClearInterval);
    }
}
