/**
 * @param {string} s
 * @return {number}
 */
var secondsToRemoveOccurrences = function (s) {
    // A 1 crosses the run of zeros before it in exactly `zeros`
    // seconds, but cannot start until the previous 1 finished, so
    // each one raises the clock to max(ans + 1, zeros).
    let ans = 0;
    let zeros = 0;
    for (const c of s) {
        if (c === "0") {
            ++zeros;
        } else if (zeros > 0) {
            ans = Math.max(ans + 1, zeros);
        }
    }
    return ans;
};
