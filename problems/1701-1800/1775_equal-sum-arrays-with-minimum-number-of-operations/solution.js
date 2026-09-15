/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
    // Reachable sums are [n, 6n] per array, so equality is impossible
    // exactly when those ranges are disjoint. Otherwise tally each
    // operation's best gain (v-1 for elements of the larger-sum array,
    // 6-v for the smaller) and spend the largest gains first.
    if (nums1.length > 6 * nums2.length || nums2.length > 6 * nums1.length) return -1;
    const sum1 = nums1.reduce((acc, v) => acc + v, 0);
    const sum2 = nums2.reduce((acc, v) => acc + v, 0);
    if (sum1 === sum2) return 0;
    const big = sum1 > sum2 ? nums1 : nums2;
    const small = sum1 > sum2 ? nums2 : nums1;
    let gap = Math.abs(sum1 - sum2);
    const gains = [0, 0, 0, 0, 0, 0];
    for (const v of big) gains[v - 1]++;
    for (const v of small) gains[6 - v]++;
    let ops = 0;
    for (let g = 5; g >= 1; g--) {
        const take = Math.min(gains[g], Math.ceil(gap / g));
        ops += take;
        gap -= take * g;
        if (gap <= 0) break;
    }
    return ops;
};
