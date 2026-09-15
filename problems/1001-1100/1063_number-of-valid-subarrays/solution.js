/**
 * @param {number[]} nums
 * @return {number}
 */
var validSubarrays = function (nums) {
    const n = nums.length;
    let total = 0;
    const stack = [];
    for (let i = 0; i <= n; i++) {
        const current = i === n ? -1 : nums[i];
        while (stack.length > 0 && nums[stack[stack.length - 1]] > current) {
            const j = stack.pop();
            total += i - j;
        }
        stack.push(i);
    }
    return total;
};
