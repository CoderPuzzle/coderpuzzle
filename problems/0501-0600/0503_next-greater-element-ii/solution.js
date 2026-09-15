/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    // One extra lap simulates the wrap-around without copying the array;
    // the resolver of any waiting index lies within one cycle ahead.
    for (let i = 0; i < 2 * n; i++) {
        const idx = i % n;
        // The stack holds indices with non-increasing values; the current
        // circular value is the first strictly greater one ahead of each
        // popped index (equal values are not popped).
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[idx]) {
            result[stack.pop()] = nums[idx];
        }
        // Push only during the first lap; the second just resolves.
        if (i < n) {
            stack.push(idx);
        }
    }
    return result;
};
