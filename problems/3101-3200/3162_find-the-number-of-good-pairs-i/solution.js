/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
    // The constraints are tiny (50 x 50), so the direct double loop
    // wins: for every value in nums2 build the divisor nums2[j] * k and
    // count how many values of nums1 it divides.
    let total = 0;
    for (const value of nums1) {
        for (const base of nums2) {
            if (value % (base * k) === 0) {
                total++;
            }
        }
    }
    return total;
};
