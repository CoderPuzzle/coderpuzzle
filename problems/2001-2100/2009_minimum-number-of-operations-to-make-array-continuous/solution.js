/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    const length = nums.length;
    nums.sort((a, b) => a - b);
    const values = nums.filter((value, index) => index === 0 || value !== nums[index - 1]);

    let left = 0;
    let kept = 0;
    for (let right = 0; right < values.length; ++right) {
        while (values[right] - values[left] >= length) ++left;
        kept = Math.max(kept, right - left + 1);
    }

    return length - kept;
};
