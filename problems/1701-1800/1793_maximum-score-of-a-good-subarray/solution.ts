function maximumScore(nums: number[], k: number): number {
    const n = nums.length;
    let best = nums[k];
    // Every good subarray contains k, so grow [lo, hi] outward from
    // (k, k); each intermediate interval is itself a candidate.
    let lo = k;
    let hi = k;
    let curMin = nums[k];
    while (lo > 0 || hi < n - 1) {
        let cand: number;
        if (lo === 0) {
            hi += 1;
            cand = nums[hi];
        } else if (hi === n - 1) {
            lo -= 1;
            cand = nums[lo];
        } else if (nums[lo - 1] >= nums[hi + 1]) {
            // Take the larger boundary element: both sides end up absorbed
            // anyway, so deferring the smaller one keeps the running minimum
            // as high as possible at the current width.
            lo -= 1;
            cand = nums[lo];
        } else {
            hi += 1;
            cand = nums[hi];
        }
        if (cand < curMin) {
            curMin = cand;
        }
        // min x width; scoring every step covers every width 1..n.
        const score = curMin * (hi - lo + 1);
        if (score > best) {
            best = score;
        }
    }
    return best;
}
