/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var countPairs = function (nums1, nums2) {
    // d[i] = nums1[i]-nums2[i]; count pairs with d[i]+d[j] > 0 by two
    // pointers over sorted d. The answer can reach ~5e9, above 32 bits,
    // but JS numbers stay exact well past that.
    const d = nums1.map((a, i) => a - nums2[i]).sort((x, y) => x - y);
    const n = d.length;
    let total = 0;
    let l = 0;
    let r = n - 1;
    while (l < r) {
        if (d[l] + d[r] > 0) {
            total += r - l;
            r--;
        } else {
            l++;
        }
    }
    return total;
};
