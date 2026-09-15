/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
    // counts maps value -> frequency in the current window; zero-count keys
    // are deleted so counts.size is the window's distinct count.
    const counts = new Map();
    let windowSum = 0;
    let best = 0;
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        counts.set(value, (counts.get(value) || 0) + 1);
        windowSum += value;
        // Retire nums[i-k] BEFORE evaluating, so exactly k members are in
        // the window at each check.
        if (i >= k) {
            const old = nums[i - k];
            const c = counts.get(old) - 1;
            if (c === 0) {
                counts.delete(old);
            } else {
                counts.set(old, c);
            }
            windowSum -= old;
        }
        // k slots holding k distinct values means no repeats.
        if (i >= k - 1 && counts.size === k && windowSum > best) {
            best = windowSum;
        }
    }
    return best;
};
