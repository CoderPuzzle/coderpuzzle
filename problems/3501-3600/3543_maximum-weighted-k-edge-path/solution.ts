function maxWeight(n: number, edges: number[][], k: number, t: number): number {
    // Layered bitset DP over path sums: bit s of node v's BigInt mask is
    // set iff some path of exactly j edges ends at v with total exactly s
    // (s < t). Weights are >= 1, so a total < t never passes through a
    // prefix >= t, and masking mid-path never drops a valid path.
    const full = (1n << BigInt(t)) - 1n;
    let dp: bigint[] = new Array(n).fill(1n);
    for (let j = 0; j < k; j++) {
        const ndp: bigint[] = new Array(n).fill(0n);
        for (const [u, v, w] of edges) {
            ndp[v] |= (dp[u] << BigInt(w)) & full;
        }
        dp = ndp;
    }
    let best = -1;
    for (const sums of dp) {
        if (sums) best = Math.max(best, sums.toString(2).length - 1);
    }
    return best;
}
