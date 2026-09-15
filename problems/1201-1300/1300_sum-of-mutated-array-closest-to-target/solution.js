/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var findBestValue = function (arr, target) {
    const mutatedSum = (value) => {
        let s = 0;
        for (const x of arr) {
            s += x < value ? x : value;
        }
        return s;
    };
    let hi = Math.max(...arr);
    let lo = 0;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (mutatedSum(mid) >= target) hi = mid;
        else lo = mid + 1;
    }
    if (Math.abs(mutatedSum(lo - 1) - target) <= Math.abs(mutatedSum(lo) - target)) {
        return lo - 1;
    }
    return lo;
};
