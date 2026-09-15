/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function (nums, k) {
    // One counter per possible value (0..50): how many distinct windows of
    // size k contain it.
    const count = new Array(51).fill(0);
    const stamp = new Array(51).fill(-1);
    for (let start = 0; start + k <= nums.length; ++start) {
        // Dedup inside the window with a stamp: a value repeated within one
        // window still counts once there.
        for (let i = start; i < start + k; ++i) {
            if (stamp[nums[i]] !== start) {
                stamp[nums[i]] = start;
                ++count[nums[i]];
            }
        }
    }
    // Scan down from the largest possible value: first hit wins.
    for (let value = 50; value >= 0; --value) {
        if (count[value] === 1) {
            return value;
        }
    }
    return -1;
};
