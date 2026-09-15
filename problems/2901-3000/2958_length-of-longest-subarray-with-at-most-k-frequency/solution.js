/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
    // Expand the window rightward; only the entering value can break
    // goodness (its own count crosses k), so shrink from the left until
    // one copy of it falls out. Every index enters and leaves the window
    // once, making the whole scan linear.
    const counts = new Map();
    let best = 0;
    let left = 0;
    for (let r = 0; r < nums.length; r++) {
        const v = nums[r];
        counts.set(v, (counts.get(v) ?? 0) + 1);
        while (counts.get(v) > k) {
            const w = nums[left];
            counts.set(w, counts.get(w) - 1);
            if (counts.get(w) === 0) counts.delete(w);
            left++;
        }
        best = Math.max(best, r - left + 1);
    }
    return best;
};
