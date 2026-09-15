/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    // Pairs start on even indices before the single element and on odd
    // indices after it — a monotone parity break, ideal for binary search.
    let lo = 0,
        hi = nums.length - 1;
    while (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);
        // Snap to an even index so mid and mid + 1 form a candidate pair.
        if (mid % 2 === 1) mid -= 1;
        if (nums[mid] === nums[mid + 1]) {
            lo = mid + 2; // intact pair: the answer lies strictly right
        } else {
            hi = mid; // broken pair: the answer is at mid or to the left
        }
    }
    return nums[lo];
};
