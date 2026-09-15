function minimumWhiteTiles(floor: string, numCarpets: number, carpetLen: number): number {
    // dp[i][j] is the fewest white tiles still visible among floor[i:]
    // when at most j carpets remain. Tile i is either left showing — and
    // pays floor[i] on top of dp[i+1][j] — or a carpet is laid with its
    // left end exactly at i, hiding i..i+carpetLen-1 and jumping the
    // state to dp[min(i+carpetLen, n)][j-1]. Filling i downward and j
    // upward leaves every reference already computed, and the j = 0 row
    // is just the suffix white counts. dp[0][numCarpets] answers for the
    // whole floor; overlapping or wasted carpets cost nothing because
    // the recurrence takes a minimum, never a sum, over placements.
    const n = floor.length;
    const dp = Array.from({ length: n + 1 }, () => new Array<number>(numCarpets + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        const white = floor.charCodeAt(i) - 48;
        dp[i][0] = dp[i + 1][0] + white;
        const covered = Math.min(i + carpetLen, n);
        for (let j = 1; j <= numCarpets; j++) {
            dp[i][j] = Math.min(dp[i + 1][j] + white, dp[covered][j - 1]);
        }
    }
    return dp[0][numCarpets];
}
