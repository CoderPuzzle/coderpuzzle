/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    // The premise taken literally: the answer turns up more than n / 2
    // times, so tally every value and stop at the first tally that crosses
    // half the array.
    const counts = new Map();
    const half = Math.floor(nums.length / 2);
    for (const num of nums) {
        const tally = (counts.get(num) || 0) + 1;
        counts.set(num, tally);
        // No value can be overtaken once a tally passes half: two values
        // cannot both hold more than half the positions.
        if (tally > half) {
            return num;
        }
    }
    // A majority is promised, so the sweep always returns mid-loop.
    throw new Error("unreachable: a majority is promised");
};
