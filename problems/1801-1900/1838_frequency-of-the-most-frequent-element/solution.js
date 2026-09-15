/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
    // Operations only raise values, so an optimal equal-value group is a
    // contiguous window in sorted order, raised to its right end.
    var arr = nums.slice().sort(function (a, b) {
        return a - b;
    });
    var best = 1;
    var left = 0;
    var windowSum = 0;
    for (var right = 0; right < arr.length; right++) {
        var value = arr[right];
        windowSum += value;
        // Cost = width * target - window sum, the increments needed to
        // lift everything to the right end; drop the smallest member
        // while the budget is exceeded.
        while ((right - left + 1) * value - windowSum > k) {
            windowSum -= arr[left];
            left += 1;
        }
        // Once a length is affordable, every shorter window is too.
        best = Math.max(best, right - left + 1);
    }
    return best;
};
