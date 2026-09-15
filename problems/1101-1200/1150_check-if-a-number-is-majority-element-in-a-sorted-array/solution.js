/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var isMajorityElement = function (nums, target) {
    // Sorted array: the target's occurrences form one contiguous run, whose
    // length is the distance between the two search boundaries.
    const lower = () => {
        let lo = 0,
            hi = nums.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const upper = () => {
        let lo = 0,
            hi = nums.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    return 2 * (upper() - lower()) > nums.length;
};
