function findTargetSumWays(nums: number[], target: number): number {
    // dp maps each reachable running sum to the number of sign assignments
    // producing it; one way to stand at 0 before any number.
    let dp = new Map<number, number>([[0, 1]]);
    for (const value of nums) {
        // Each reachable total branches into +value and -value; identical
        // totals merge and their counts add, so the map stays bounded by
        // distinct sums, not 2^i.
        const nxt = new Map<number, number>();
        for (const [total, count] of dp) {
            nxt.set(total + value, (nxt.get(total + value) || 0) + count);
            nxt.set(total - value, (nxt.get(total - value) || 0) + count);
        }
        dp = nxt;
    }
    return dp.get(target) || 0;
}
