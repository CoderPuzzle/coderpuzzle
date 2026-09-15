// A linear pattern delay + period * count cannot come from one fixed
// setInterval: every firing re-schedules the next tick as a fresh one-shot
// timer whose delay grows with the running execution count. The id handed
// back to the caller belongs to the very first timer; a module-level
// registry maps it onto whatever descendant handle is pending right now,
// so customClearInterval(id) still reaches the live end of the chain.
// Stale or repeated clears miss the registry and are harmless no-ops.
const PENDING_INTERVALS = new Map();

function customInterval(fn, delay, period) {
    let count = 0;
    const tick = () => {
        fn();
        count += 1;
        timerId = setTimeout(tick, delay + period * count);
    };
    let timerId = setTimeout(tick, delay + period * count);
    const currentTimer = () => timerId;
    PENDING_INTERVALS.set(timerId, currentTimer);
    return timerId;
}

function customClearInterval(id) {
    const currentTimer = PENDING_INTERVALS.get(id);
    if (currentTimer === undefined) {
        return;
    }
    PENDING_INTERVALS.delete(id);
    clearTimeout(currentTimer());
}

class Solution {
    run(intervalCase) {
        intervalCase.drive(customInterval, customClearInterval);
    }
}
