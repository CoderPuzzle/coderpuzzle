/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDistance = function (nums1, nums2) {
    // Two pointers: as i grows, nums1[i] shrinks, so the farthest usable j
    // never moves left. Advance j as far as validity allows.
    let best = 0;
    let j = 0;
    for (let i = 0; i < nums1.length; i++) {
        while (j < nums2.length && (j < i || nums2[j] >= nums1[i])) {
            j++;
        }
        if (j > i && nums2[j - 1] >= nums1[i]) {
            best = Math.max(best, j - 1 - i);
        }
    }
    return best;
};
