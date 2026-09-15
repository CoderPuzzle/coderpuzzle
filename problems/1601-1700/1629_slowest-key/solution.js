/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {string}
 */
var slowestKey = function (releaseTimes, keysPressed) {
    // A single left-to-right scan computes each duration once and keeps the
    // best (longest duration, then lexicographically largest key).
    let bestDuration = releaseTimes[0];
    let bestChar = keysPressed[0];
    for (let i = 1; i < releaseTimes.length; ++i) {
        const duration = releaseTimes[i] - releaseTimes[i - 1];
        const c = keysPressed[i];
        if (duration > bestDuration || (duration === bestDuration && c > bestChar)) {
            bestDuration = duration;
            bestChar = c;
        }
    }
    return bestChar;
};
