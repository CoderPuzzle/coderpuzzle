function cheapestJump(coins: number[], maxJump: number): number[] {
    // Suffix costs, built right to left: cost[i] is the cheapest total for
    // the rest of the walk when standing on i, coins[i] included, while
    // UNREACHABLE marks blocked or stranded cells and is never added to.
    // Scanning the window i+1..i+maxJump in increasing index order and
    // replacing the best only on a strict improvement leaves next[i] at the
    // SMALLEST index achieving the minimum continuation, so the
    // lexicographic tie rule is stored in the table itself. Every value in
    // play stays under 101001, far inside the range doubles hold exactly.
    const UNREACHABLE = 101 * 1000 + 1;
    const n = coins.length;
    const cost: number[] = new Array<number>(n).fill(UNREACHABLE);
    const next: number[] = new Array<number>(n).fill(-1);
    if (coins[n - 1] !== -1) {
        cost[n - 1] = coins[n - 1];
    }
    for (let i = n - 2; i >= 0; --i) {
        if (coins[i] === -1) {
            continue;
        }
        const limit = Math.min(i + maxJump, n - 1);
        let best = UNREACHABLE;
        let bestFrom = -1;
        for (let j = i + 1; j <= limit; ++j) {
            if (cost[j] < best) {
                best = cost[j];
                bestFrom = j;
            }
        }
        if (bestFrom !== -1) {
            cost[i] = coins[i] + best;
            next[i] = bestFrom;
        }
    }
    if (cost[0] === UNREACHABLE) {
        return [];
    }
    // The walk from index 1 follows next[] and is the lexicographically
    // smallest minimum-cost path: at every divergence between two equal-cost
    // optimal paths the smaller next index wins outright, whatever the
    // remaining suffixes do.
    const path: number[] = [];
    for (let i = 0; i !== -1; i = next[i]) {
        path.push(i + 1);
    }
    return path;
}
