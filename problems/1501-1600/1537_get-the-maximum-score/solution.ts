function maxSum(nums1: number[], nums2: number[]): number {
    const MOD = 1000000007n;
    let i = 0,
        j = 0;
    const n1 = nums1.length,
        n2 = nums2.length;
    // Running sum of each array since the last crossing point, kept as
    // BigInt: with n up to 1e5 and values up to 1e7, an unreduced segment
    // sum can reach roughly 1e12.
    let sum1 = 0n,
        sum2 = 0n;
    let result = 0n;
    while (i < n1 && j < n2) {
        if (nums1[i] < nums2[j]) {
            sum1 += BigInt(nums1[i]);
            ++i;
        } else if (nums1[i] > nums2[j]) {
            sum2 += BigInt(nums2[j]);
            ++j;
        } else {
            // Crossing point: lock in the better of the two segments, plus
            // the shared value itself (counted once), then reset.
            result += (sum1 > sum2 ? sum1 : sum2) + BigInt(nums1[i]);
            sum1 = 0n;
            sum2 = 0n;
            ++i;
            ++j;
        }
    }
    // Drain whichever array still has a tail; no more crossings are
    // possible once one array is exhausted.
    while (i < n1) {
        sum1 += BigInt(nums1[i]);
        ++i;
    }
    while (j < n2) {
        sum2 += BigInt(nums2[j]);
        ++j;
    }
    result += sum1 > sum2 ? sum1 : sum2;
    return Number(result % MOD);
}
