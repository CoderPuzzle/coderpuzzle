/**
 * @param {number[]} heights
 * @return {number}
 */
var maximumSumOfHeights = function (heights) {
    // best[i] = heaviest sum of a non-decreasing ramp ending at i with
    // tower i kept at full height; one stack sweep per direction gives
    // every peak candidate in O(n) total.
    const reversed = [...heights].reverse();
    const left = rampSums(heights);
    const right = rampSums(reversed).reverse(); // back to original indices
    let best = 0;
    for (let i = 0; i < heights.length; ++i) {
        // Tower i sits in both ramps when it is the peak, so its own
        // height is counted once per direction and must be subtracted.
        best = Math.max(best, left[i] + right[i] - heights[i]);
    }
    return best;
};

// A stack of (height, width) runs holds the clamped prefix; popping taller
// runs re-stamps those towers at the current, lower height in one multiply.
// Sums stay exact: 1000 towers of height 1e9 cap any total at 1e12, far
// below Number's exact-integer limit of 2^53.
function rampSums(nums) {
    const best = new Array(nums.length).fill(0);
    const runHeight = []; // parallel run stacks, strictly rising heights
    const runWidth = [];
    let total = 0;
    for (let i = 0; i < nums.length; ++i) {
        let width = 1;
        while (runHeight.length > 0 && runHeight[runHeight.length - 1] >= nums[i]) {
            total -= runHeight[runHeight.length - 1] * runWidth[runWidth.length - 1];
            width += runWidth.pop();
            runHeight.pop();
        }
        total += nums[i] * width;
        runHeight.push(nums[i]);
        runWidth.push(width);
        best[i] = total;
    }
    return best;
}
