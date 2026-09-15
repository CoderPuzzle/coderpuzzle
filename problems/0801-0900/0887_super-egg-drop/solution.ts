function superEggDrop(k: number, n: number): number {
    // dp[e]: floors resolvable with `moves` moves and e eggs; grow the
    // move count until k eggs cover all n floors.
    const dp = new Array<number>(k + 1).fill(0);
    let moves = 0;
    while (dp[k] < n) {
        moves++;
        // One drop settles its own floor plus the below-case (e - 1 eggs)
        // and the above-case (e eggs), each with one move fewer. Sweeping
        // e downward keeps dp[e - 1] at the previous move's value — the
        // in-place 0/1 knapsack trick.
        for (let e = k; e >= 1; e--) {
            dp[e] = dp[e - 1] + dp[e] + 1;
        }
    }
    return moves;
}
