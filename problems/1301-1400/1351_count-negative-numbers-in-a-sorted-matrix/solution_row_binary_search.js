/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
    // Every row is non-increasing, so its negatives are a suffix and the
    // first negative index is one bisection away in O(log n).
    const n = grid[0].length;
    let count = 0;
    for (const row of grid) {
        let lo = 0;
        let hi = n;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (row[mid] < 0) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        count += n - lo;
    }
    return count;
};
