/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var kConcatenationMaxSum = function (arr, k) {
    const MOD = 1000000007;

    const kadane = (values) => {
        let best = 0;
        let current = 0;
        for (const value of values) {
            // clamped at 0: the empty subarray is always an option
            current = Math.max(current + value, 0);
            best = Math.max(best, current);
        }
        return best;
    };

    const maxPrefix = (values) => {
        let best = 0;
        let current = 0;
        for (const value of values) {
            current += value;
            best = Math.max(best, current);
        }
        return best;
    };

    const maxSuffix = (values) => {
        let best = 0;
        let current = 0;
        for (let i = values.length - 1; i >= 0; i--) {
            current += values[i];
            best = Math.max(best, current);
        }
        return best;
    };

    let total = 0;
    for (const value of arr) total += value;

    // the best subarray never needs more than two partial copies plus
    // whole copies in between, so Kadane over two copies plus prefix
    // and suffix sums cover every candidate
    if (k === 1) return kadane(arr) % MOD;
    // two adjacent copies cover every boundary-hugging candidate
    let best = kadane(arr.concat(arr));
    if (k > 2 && total > 0) {
        // whole middle copies pay off only when total > 0: score the
        // best suffix + best prefix + (k - 2) full copies
        best = Math.max(best, maxSuffix(arr) + maxPrefix(arr) + (k - 2) * total);
    }
    // reduce only at the end — residues no longer compare by magnitude
    return best % MOD;
};
