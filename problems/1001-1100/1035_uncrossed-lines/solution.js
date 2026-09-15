/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxUncrossedLines = function (nums1, nums2) {
    const n = nums2.length;
    let prev = new Array(n + 1).fill(0);
    for (const a of nums1) {
        const cur = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (a === nums2[j - 1]) {
                cur[j] = prev[j - 1] + 1;
            } else {
                cur[j] = Math.max(cur[j - 1], prev[j]);
            }
        }
        prev = cur;
    }
    return prev[n];
};
