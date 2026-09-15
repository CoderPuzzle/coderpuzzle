/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minimumSum = function (nums1, nums2) {
    // For a shared value the two indices are independent, so its best good
    // pair is its first occurrence in each array: minimizing i and j
    // separately minimizes i + j. Record every value's first index in
    // nums1, never overwriting an earlier one. A Map keyed by numbers keeps
    // integer keys distinct.
    const firstIndex = new Map();
    for (let i = 0; i < nums1.length; ++i) {
        if (!firstIndex.has(nums1[i])) {
            firstIndex.set(nums1[i], i);
        }
    }
    // One pass over nums2: every value the map knows scores
    // firstIndex[nums2[j]] + j, and the smallest score wins. The flag stays
    // -1 when nothing matched.
    let best = -1;
    for (let j = 0; j < nums2.length; ++j) {
        if (firstIndex.has(nums2[j])) {
            const total = firstIndex.get(nums2[j]) + j;
            if (best === -1 || total < best) {
                best = total;
            }
        }
    }
    return best;
};
