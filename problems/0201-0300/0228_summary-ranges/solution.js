/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    const ranges = [];
    let i = 0;
    while (i < nums.length) {
        const start = i;
        // The run extends while the next value is exactly one past the
        // current one: since the input is sorted and unique, the run's
        // endpoints are already in final order when the extension stops.
        while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
            ++i;
        }
        // Equal endpoints collapse to the bare "a" form.
        if (nums[start] === nums[i]) {
            ranges.push(String(nums[start]));
        } else {
            ranges.push(`${nums[start]}->${nums[i]}`);
        }
        ++i;
    }
    return ranges;
};
