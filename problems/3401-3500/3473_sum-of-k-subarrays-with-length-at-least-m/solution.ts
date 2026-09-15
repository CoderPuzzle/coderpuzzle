function maxSum(nums: number[], k: number, m: number): number {
    const NEG = -Infinity;

    const n = nums.length;
    const prefix: number[] = new Array(n + 1);
    prefix[0] = 0;
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
    // dp over rows: prev[j] = best sum of (i-1) subarrays within first j elements
    let prev: number[] = new Array(n + 1).fill(0); // i = 0
    for (let round = 1; round <= k; round++) {
        const cur: number[] = new Array(n + 1).fill(NEG);
        let best = NEG; // running max of prev[t] - prefix[t] for t <= j - m
        for (let j = 1; j <= n; j++) {
            const t = j - m;
            if (t >= 0) {
                const cand = prev[t] - prefix[t];
                if (cand > best) best = cand;
            }
            if (best !== NEG) {
                const val = prefix[j] + best;
                cur[j] = cur[j - 1] > val ? cur[j - 1] : val;
            } else {
                cur[j] = cur[j - 1];
            }
        }
        prev = cur;
    }
    return prev[n];
}
