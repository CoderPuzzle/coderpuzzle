/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] > nums[hi]) {
            // A value larger than nums[hi] can only sit before the
            // rotation point, so the minimum lies strictly right of mid.
            lo = mid + 1;
        } else if (nums[mid] < nums[hi]) {
            // nums[mid..hi] is non-decreasing, so the rotation point —
            // and the minimum — is at mid or to its left; mid stays
            // a candidate.
            hi = mid;
        } else {
            // nums[mid] == nums[hi]: the equal run may straddle the
            // pivot, so neither comparison above can tell where the
            // minimum hides. nums[hi] also appears at mid, so dropping
            // index hi cannot lose the minimum while strictly
            // shrinking the window.
            hi--;
        }
    }
    return nums[lo];
};
