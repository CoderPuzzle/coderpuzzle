/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithmetic = function (nums) {
    // Every value is bounded by n <= 10^5, so plain numbers hold every
    // integer exactly, far inside the 2^53 range. left/right: longest run
    // of equal consecutive differences ending at i / starting at i (a pair
    // always counts as a run of 2).
    const n = nums.length;
    const left = new Array(n).fill(1);
    const right = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        if (i >= 2 && nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
            left[i] = left[i - 1] + 1;
        } else {
            left[i] = 2;
        }
    }
    for (let i = n - 2; i >= 0; i--) {
        if (i <= n - 3 && nums[i + 1] - nums[i] === nums[i + 2] - nums[i + 1]) {
            right[i] = right[i + 1] + 1;
        } else {
            right[i] = 2;
        }
    }
    let best = 0;
    for (const value of left) {
        if (value > best) {
            best = value;
        }
    }
    // Replacing nums[p] either stops the subarray at p (extending the run
    // on one side) or spans p, gluing a left run to a right run whose
    // common difference is forced to (nums[p+1]-nums[p-1])/2.
    for (let p = 0; p < n; p++) {
        if (p >= 1) {
            best = Math.max(best, left[p - 1] + 1);
        }
        if (p <= n - 2) {
            best = Math.max(best, right[p + 1] + 1);
        }
        if (p >= 1 && p <= n - 2) {
            const diff = nums[p + 1] - nums[p - 1];
            if (diff % 2 === 0) {
                const d = diff / 2;
                const leftLen = p >= 2 && nums[p - 1] - nums[p - 2] === d ? left[p - 1] : 1;
                const rightLen = p <= n - 3 && nums[p + 2] - nums[p + 1] === d ? right[p + 1] : 1;
                best = Math.max(best, leftLen + rightLen + 1);
            }
        }
    }
    return best;
};
