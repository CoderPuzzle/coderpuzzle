/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextPermutation = function (nums) {
    // Scan from the right for the pivot: the first element smaller than its
    // successor. Everything after it is a non-increasing suffix, the largest
    // arrangement of that tail, so the pivot is the only position that can
    // still grow while the prefix stays fixed.
    let pivot = nums.length - 2;
    while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) {
        pivot--;
    }
    if (pivot >= 0) {
        // The rightmost value exceeding the pivot is the smallest one that
        // does; the >= above means equals are stepped over.
        let successor = nums.length - 1;
        while (nums[successor] <= nums[pivot]) {
            successor--;
        }
        [nums[pivot], nums[successor]] = [nums[successor], nums[pivot]];
    }
    // The suffix is still non-increasing after the swap, so reversing it
    // yields the smallest possible tail. No pivot means the whole array was
    // the last permutation, and the full reverse wraps to the first.
    for (let left = pivot + 1, right = nums.length - 1; left < right; left++, right--) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
    }
    return nums;
};
