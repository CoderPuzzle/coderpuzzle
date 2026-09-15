function minPartitionScore(nums: number[], k: number): number {
    // Bounds: n <= 1000 and nums[i] <= 10^4, so every prefix sum is at most
    // 10^7, every subarray value s*(s+1)/2 at most ~5*10^13, and every sum
    // or product along the way stays under 10^14 < 2^53 — exact in JS
    // numbers (s*(s+1) is even, so the halving is exact too).
    const n = nums.length;
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    const value = (s: number): number => (s * (s + 1)) / 2;

    // dp over "exactly j subarrays covering the first i elements".
    // Layer j only needs i in [j, n-k+j]: at least j elements for j
    // blocks, and at least one element per remaining k-j blocks.
    if (k === 1) {
        return value(prefix[n]);
    }
    let prev: number[] = new Array(n + 1).fill(Infinity);
    for (let i = 1; i <= n - k + 1; i++) {
        prev[i] = value(prefix[i]);
    }
    let cur: number[] = new Array(n + 1).fill(Infinity);

    // The cost prev[t] + value(P[i]-P[t]) satisfies the quadrangle
    // inequality because value is convex, so the best split point is
    // non-decreasing in i: search [optLo, optHi] only, and recurse with
    // the found point splitting the candidate range.
    const solve = (lo: number, hi: number, optLo: number, optHi: number): void => {
        if (lo > hi) {
            return;
        }
        const mid = (lo + hi) >> 1;
        let best = Infinity;
        let bestT = optLo;
        const hiT = Math.min(optHi, mid - 1);
        const pMid = prefix[mid];
        for (let t = optLo; t <= hiT; t++) {
            const s = pMid - prefix[t];
            const v = prev[t] + (s * (s + 1)) / 2;
            if (v < best) {
                best = v;
                bestT = t;
            }
        }
        cur[mid] = best;
        solve(lo, mid - 1, optLo, bestT);
        solve(mid + 1, hi, bestT, optHi);
    };

    for (let j = 2; j <= k; j++) {
        solve(j, n - k + j, j - 1, n - k + j - 1);
        [prev, cur] = [cur, prev];
    }
    return prev[n];
}
