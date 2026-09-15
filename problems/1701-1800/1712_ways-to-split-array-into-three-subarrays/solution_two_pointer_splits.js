/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplit = function (nums) {
    const MOD = 1000000007;
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    const total = prefix[n];
    let answer = 0;
    // Both cut bounds move monotonically with the first cut, so two pointers
    // that only ever advance replace the repeated binary searches.
    let lo = 2;
    let hi = 2;
    for (let i = 1; i < n - 1; i++) {
        const left = prefix[i];
        if (lo < i + 1) {
            lo = i + 1;
        }
        // left <= mid becomes prefix[j] >= 2 * left: skip the entries that
        // leave the middle block too small.
        while (lo < n && prefix[lo] < 2 * left) {
            lo++;
        }
        if (lo >= n) {
            continue;
        }
        // mid <= right becomes prefix[j] <= (total + left) / 2 — the floor is
        // exact because the bound is an integer inequality.
        if (hi < lo) {
            hi = lo;
        }
        while (hi < n && prefix[hi] <= Math.floor((total + left) / 2)) {
            hi++;
        }
        if (hi > lo) {
            answer = (answer + hi - lo) % MOD;
        }
    }
    return answer;
};
