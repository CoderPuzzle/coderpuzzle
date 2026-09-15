/**
 * @param {number[]} nums
 * @return {number}
 */
var countWays = function (nums) {
    // A size-k group exists exactly when k values lie strictly below k and
    // none equals k, so each candidate size is two comparisons on the
    // sorted copy. n <= 100000, so every index and the count stay far
    // inside Number's exact range.
    const values = [...nums].sort((a, b) => a - b);
    const n = values.length;
    let ways = 0;
    for (let k = 0; k <= n; k++) {
        if ((k === 0 || values[k - 1] < k) && (k === n || values[k] > k)) {
            ways++;
        }
    }
    return ways;
};
