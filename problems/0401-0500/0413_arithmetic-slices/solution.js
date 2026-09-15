/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
    // Slices are counted by their right end: an element that keeps the run
    // arithmetic extends every slice ending one step earlier plus adds a
    // fresh length-3 one, so current steps up by one each time.
    let total = 0;
    let current = 0;
    for (let i = 2; i < nums.length; ++i) {
        if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
            ++current;
            total += current;
        } else {
            // The run is broken; no slice crosses the new difference.
            current = 0;
        }
    }
    return total;
};
