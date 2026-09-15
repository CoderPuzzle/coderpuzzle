/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var validSubarraySize = function (nums, threshold) {
    const n = nums.length;
    // next_le[i] = nearest index j > i with nums[j] <= nums[i]
    const nextLe = new Array(n).fill(n);
    let stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
            stack.pop();
        }
        nextLe[i] = stack.length ? stack[stack.length - 1] : n;
        stack.push(i);
    }

    // prev_lt[i] = nearest index j < i with nums[j] < nums[i]
    const prevLt = new Array(n).fill(-1);
    stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
            stack.pop();
        }
        prevLt[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(i);
    }

    let best = -1;
    for (let i = 0; i < n; i++) {
        const span = nextLe[i] - prevLt[i] - 1;
        const k = Math.floor(threshold / nums[i]) + 1;
        if (k <= span && (best === -1 || k < best)) {
            best = k;
        }
    }
    return best;
};
