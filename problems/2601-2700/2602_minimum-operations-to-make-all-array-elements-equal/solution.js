/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var minOperations = function (nums, queries) {
    nums = nums.slice().sort((a, b) => a - b);
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    const out = [];
    for (const q of queries) {
        // Each query is the sum of |nums[i] - q|; sorted prefix sums make it
        // one binary search plus O(1) arithmetic.
        let lo = 0,
            hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] < q) lo = mid + 1;
            else hi = mid;
        }
        // j counts elements strictly below q (ties land right but contribute
        // zero either way): smaller ones are raised to q, the rest lowered.
        const j = lo;
        const left = q * j - prefix[j];
        const right = prefix[n] - prefix[j] - q * (n - j);
        out.push(left + right);
    }
    return out;
};
