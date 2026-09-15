/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctAverages = function (nums) {
    // Sort, then pair the i-th smallest with the i-th largest. The average
    // (a + b) / 2 is distinct exactly when the sum a + b is distinct, so
    // track pair sums and never touch floats.
    const ordered = [...nums].sort((a, b) => a - b);
    const sums = new Set();
    const n = ordered.length;
    for (let i = 0; i < n / 2; ++i) {
        sums.add(ordered[i] + ordered[n - 1 - i]);
    }
    return sums.size;
};
