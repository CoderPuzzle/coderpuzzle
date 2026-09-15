/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canBeIncreasing = function (nums) {
    // Single pass with a virtual removal. At the first violation
    // nums[i-1] >= nums[i], the one removal must be nums[i-1] or nums[i]:
    // drop nums[i-1] when the chain still rises through it (i === 1 or
    // nums[i-2] < nums[i]), else keep the old prev, which amounts to
    // dropping nums[i]. A second violation is fatal.
    let prev = nums[0];
    let removed = false;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= prev) {
            if (removed) return false;
            removed = true;
            if (i === 1 || nums[i - 2] < nums[i]) prev = nums[i];
        } else {
            prev = nums[i];
        }
    }
    return true;
};
