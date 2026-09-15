function maxSubarraySum(nums: number[]): number {
    const n = nums.length;
    // Deleting the only element is forbidden, so its value stands.
    if (n === 1) return nums[0];
    // Per-candidate account: smallest adjusted prefix P(j) minus the |x|'s
    // deleted after j. Key 0 is the plain no-deletion prefix minimum.
    // prefixMap keyed by the deleted value; key 0 tracks min prefix sum.
    const prefixMap = new Map<number, number>();
    prefixMap.set(0, 0);
    let prefixSum = 0;
    let minPrefix = 0;
    // Seeded with nums[0] so all-negative arrays need no zero sentinel.
    let result = nums[0];
    for (const num of nums) {
        prefixSum += num;
        // Best subarray ending at r: P(r) minus the smallest adjusted prefix
        // seen so far. Runs before num joins any account, so every anchor
        // strictly precedes r and the subarray is never empty.
        if (prefixSum - minPrefix > result) result = prefixSum - minPrefix;
        // Only a negative x can help: deleting a positive would only
        // shrink every subarray sum.
        if (num < 0) {
            // Anchor at min(old account, plain prefix min) and subtract |x|
            // again: the deletion window may restart at this occurrence.
            const p0 = prefixMap.get(0)!;
            let val: number;
            if (prefixMap.has(num)) {
                const prev = prefixMap.get(num)!;
                val = (p0 < prev ? p0 : prev) + num;
            } else {
                val = p0 + num;
            }
            prefixMap.set(num, val);
            if (val < minPrefix) minPrefix = val;
        }
        if (prefixSum < prefixMap.get(0)!) prefixMap.set(0, prefixSum);
        if (prefixMap.get(0)! < minPrefix) minPrefix = prefixMap.get(0)!;
    }
    return result;
}
