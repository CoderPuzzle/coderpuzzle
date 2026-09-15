function maxSubarraySum(nums: number[], k: number): number {
    const n = nums.length;
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    const INF = Infinity;
    // minPref[r]: smallest prefix sum seen at an index congruent to r
    // mod k. Length divisible by k means both endpoints share a residue,
    // so within each class maximize prefix[i] minus the earlier minimum.
    const minPref: number[] = new Array(k).fill(INF);
    // -Infinity start, not 0: an all-negative array still has a best.
    let best = -Infinity;
    for (let i = 0; i <= n; i++) {
        const r = i % k;
        // Compare before updating the bucket, so the paired prefix is
        // strictly earlier and the subarray stays non-empty.
        if (minPref[r] !== INF) {
            const cand = prefix[i] - minPref[r];
            if (cand > best) {
                best = cand;
            }
        }
        if (prefix[i] < minPref[r]) {
            minPref[r] = prefix[i];
        }
    }
    return best;
}
