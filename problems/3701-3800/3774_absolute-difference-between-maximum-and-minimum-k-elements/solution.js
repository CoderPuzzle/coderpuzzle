/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var absDifference = function (nums, k) {
    // Sorted ascending, the k smallest elements occupy the first k slots
    // and the k largest the last k; all values are positive, so the
    // larger sum always comes from the top end and the absolute
    // difference is just last k minus first k.
    nums.sort((a, b) => a - b);
    let small = 0;
    let large = 0;
    for (let i = 0; i < k; i++) {
        small += nums[i];
        large += nums[nums.length - k + i];
    }
    return large - small;
};
