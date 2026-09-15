/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function (nums1, nums2) {
    // Both arrays ascend, so the front runner carrying the smaller value
    // can never match anything ahead on the other side: drop it and
    // repeat. The first tie is necessarily the smallest shared value; a
    // drained side proves no common element exists. All values are
    // <= 10^9, far below Number's exact bound 2^53.
    let i = 0;
    let j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            return nums1[i];
        }
        if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    return -1;
};
