/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function (nums, threshold) {
    const total = (divisor) => {
        let s = 0;
        for (const x of nums) {
            s += Math.ceil(x / divisor);
        }
        return s;
    };
    // The ceiled sum is non-increasing in the divisor, so "sum <= threshold"
    // is monotone: lower-bound search for the smallest valid d. Past
    // max(nums) every term is already 1, capping the range.
    let lo = 1,
        hi = Math.max(...nums);
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (total(mid) <= threshold) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};
