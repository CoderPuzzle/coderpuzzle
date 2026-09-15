/**
 * @param {number[]} nums
 * @return {number[]}
 */
var moveZeroes = function (nums) {
    // Invariant: nums.slice(0, write) is the stabilized prefix of non-zero
    // values in their original order. write never passes the read position,
    // so copying forward cannot clobber an unread value.
    let write = 0;
    for (const value of nums) {
        if (value !== 0) {
            nums[write] = value;
            write++;
        }
    }
    // Slots from write onward are settled by decree rather than by
    // exchange: overwrite the whole tail with zeros.
    for (let index = write; index < nums.length; index++) {
        nums[index] = 0;
    }
    return nums;
};
