/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
    // The values in nums are the numbers 1..n with one value doubled and
    // one lost, so counting occurrences settles both questions at once:
    // slot v of a count array indexed by value holds 2 for the duplicated
    // value and 0 for the missing one.
    const counts = new Array(nums.length + 1).fill(0);
    for (const value of nums) {
        counts[value]++;
    }
    // One sweep over the value range 1..n reads the counts back; every
    // other slot holds 1 and carries no information, so exactly one
    // duplicate and one gap are found.
    let duplicate = 0;
    let missing = 0;
    for (let value = 1; value <= nums.length; ++value) {
        if (counts[value] === 2) {
            duplicate = value;
        } else if (counts[value] === 0) {
            missing = value;
        }
    }
    return [duplicate, missing];
};
