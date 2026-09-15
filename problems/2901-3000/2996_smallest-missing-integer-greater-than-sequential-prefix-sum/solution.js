/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function (nums) {
    // The floor of the answer is the sum of the longest prefix in which
    // every value is exactly its predecessor plus one; the first break
    // in that progression ends the prefix, so one scan settles it.
    let total = nums[0];
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] !== nums[i - 1] + 1) break;
        total += nums[i];
    }
    // From that floor, step upward past every value the array holds;
    // the first gap is the smallest missing integer.
    const present = new Set(nums);
    while (present.has(total)) {
        total += 1;
    }
    return total;
};
