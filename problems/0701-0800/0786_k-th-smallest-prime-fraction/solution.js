/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function (arr, k) {
    const n = arr.length;
    let lo = 0.0,
        hi = 1.0;
    let ans = [arr[0], arr[n - 1]];
    // Binary search on the fraction value; count fractions <= mid.
    for (let it = 0; it < 50; it++) {
        const mid = (lo + hi) / 2.0;
        let count = 0;
        let best = 0.0;
        let bestPair = [arr[0], arr[n - 1]];
        let j = 1;
        for (let i = 0; i < n - 1; i++) {
            while (j < n && arr[i] > mid * arr[j]) {
                j += 1;
            }
            count += n - j;
            if (j < n) {
                const val = arr[i] / arr[j];
                if (val > best) {
                    best = val;
                    bestPair = [arr[i], arr[j]];
                }
            }
        }
        if (count >= k) {
            hi = mid;
            ans = bestPair;
        } else {
            lo = mid;
        }
    }
    return ans;
};
