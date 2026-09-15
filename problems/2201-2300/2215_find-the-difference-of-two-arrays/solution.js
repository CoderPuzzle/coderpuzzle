/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
    // Set membership answers "present in the other array" in O(1); the
    // surviving distinct values are emitted ascending for judging.
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    const only1 = [...set1].filter((value) => !set2.has(value));
    const only2 = [...set2].filter((value) => !set1.has(value));
    only1.sort((a, b) => a - b);
    only2.sort((a, b) => a - b);
    return [only1, only2];
};
