/**
 * @param {number[]} nums
 * @return {number[]}
 */
var removeDuplicates = function (nums) {
    // Sorted order puts every duplicate run adjacent, so one forward
    // scan can compact the array in place: write marks the end of the
    // unique prefix built so far, and the first element is always kept.
    let write = 1;
    for (let read = 1; read < nums.length; ++read) {
        // nums[write - 1] is the last value kept; in a sorted array the
        // scan meets a new value exactly when the previous run ends.
        if (nums[read] !== nums[write - 1]) {
            nums[write] = nums[read];
            ++write;
        }
    }
    // The statement frees the tail beyond the unique prefix, so the
    // compacted prefix is the whole judged answer; its length is k.
    nums.length = write;
    return nums;
};
