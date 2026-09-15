/**
 * @param {number[]} nums
 * @return {number}
 */
var maxWidthRamp = function (nums) {
    // Monotonic stack of record lows: an index matters as a left end
    // only when no earlier index holds a smaller value.
    const stack = [];
    for (let i = 0; i < nums.length; ++i) {
        if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
            stack.push(i);
        }
    }
    // Right-to-left: the first (largest) j that dominates a stack top
    // pops it at that top's widest possible width.
    let best = 0;
    for (let j = nums.length - 1; j >= 0; --j) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
            const top = stack.pop();
            best = Math.max(best, j - top);
        }
    }
    return best;
};
