function maximumLength(nums: number[], k: number): number {
    // A valid subsequence's adjacent sums share one unknown residue, so
    // try each candidate val in [0, k). While streaming nums under a
    // fixed val, dp[r] is the best chain whose last element is r mod k;
    // appending an element of residue r needs a previous element at
    // residue (val - r) % k, and a lone element always restarts a chain.
    // The double % keeps the remainder non-negative. n and k stay at
    // 10^3, so the n*k work and every value sit far inside doubles.
    const residues = nums.map((value) => value % k);
    let best = 0;
    for (let val = 0; val < k; val++) {
        const dp = new Array(k).fill(0);
        for (const r of residues) {
            const prev = dp[(((val - r) % k) + k) % k];
            const length = prev >= 1 ? prev + 1 : 1;
            if (length > dp[r]) {
                dp[r] = length;
                if (length > best) {
                    best = length;
                }
            }
        }
    }
    return best;
}
