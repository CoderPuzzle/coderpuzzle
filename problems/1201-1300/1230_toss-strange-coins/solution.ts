function probabilityOfHeads(prob: number[], target: number): number {
    // dp[c] = probability of exactly c heads among the coins so far; zero
    // heads is certain before any toss.
    const dp: number[] = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (const p of prob) {
        // Each coin shifts probability between adjacent counts: the tails
        // branch keeps c, the heads branch arrives from c-1. Descending keeps
        // dp[c-1] at the previous coin's value (upward would let one coin
        // contribute two heads).
        for (let c = target; c > 0; c--) {
            dp[c] = dp[c] * (1 - p) + dp[c - 1] * p;
        }
        // Zero heads can only be reached by another tail.
        dp[0] *= 1 - p;
    }
    // Counts above target are never stored; dp[target] is exact.
    return dp[target];
}
