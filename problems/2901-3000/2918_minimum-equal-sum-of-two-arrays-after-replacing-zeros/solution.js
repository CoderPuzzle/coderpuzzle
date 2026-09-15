/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minSum = function (nums1, nums2) {
    // Sums reach 10^5 * 10^6 = 10^11 — above 2^37 but far under 2^53, so
    // plain numbers carry every sum exactly.
    let sum1 = 0;
    let sum2 = 0;
    let zeros1 = 0;
    let zeros2 = 0;
    for (const num of nums1) {
        sum1 += num;
        if (num === 0) zeros1 += 1;
    }
    for (const num of nums2) {
        sum2 += num;
        if (num === 0) zeros2 += 1;
    }
    // Cheapest fill: every zero becomes 1. An array with no zeros is stuck
    // at its exact sum and can never move.
    if (zeros1 === 0 && zeros2 === 0) {
        return sum1 === sum2 ? sum1 : -1;
    }
    if (zeros1 === 0) {
        // nums2 can take any sum >= sum2 + zeros2, so it must be able to
        // climb exactly to the stuck sum1.
        return sum1 >= sum2 + zeros2 ? sum1 : -1;
    }
    if (zeros2 === 0) {
        return sum2 >= sum1 + zeros1 ? sum2 : -1;
    }
    // Both arrays can climb freely from their all-1 fill: meet at the
    // higher floor.
    return Math.max(sum1 + zeros1, sum2 + zeros2);
};
