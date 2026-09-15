// Leading-edge throttle with one pending window: the first call executes
// immediately and opens a t-millisecond guard via a single setTimeout.
// Calls inside the window only overwrite the saved-latest-arguments slot
// (an explicit null sentinel keeps genuinely empty argument lists intact).
// When the window ends, the callback either closes quietly or replays the
// saved arguments at that instant and opens the next window anchored
// there — matching the transcript contract on the judge's virtual clock.
function throttle(fn, t) {
    let waiting = false;
    let saved = null;
    const onWindowEnd = () => {
        if (saved === null) {
            waiting = false;
            return;
        }
        const args = saved;
        saved = null;
        fn(...args);
        setTimeout(onWindowEnd, t);
    };
    return (...args) => {
        if (waiting) {
            saved = args;
            return;
        }
        fn(...args);
        waiting = true;
        setTimeout(onWindowEnd, t);
    };
}

class Solution {
    run(throttleCase) {
        throttleCase.drive(throttle);
    }
}
