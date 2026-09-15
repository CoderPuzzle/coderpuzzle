function combinationSum4(nums: number[], target: number): number {
    // Order matters, so the table is indexed by the total alone: each
    // sequence reaching t is identified by its last element, making
    // ways[t] the sum of ways[t - x] over every final pick x <= t.
    // Every count stays inside the promised 32-bit range, which doubles
    // hold exactly.
    const ways = new Array<number>(target + 1).fill(0);
    ways[0] = 1; // the empty sequence: exactly one way to build 0
    for (let t = 1; t <= target; ++t) {
        for (const x of nums) {
            if (x <= t) ways[t] += ways[t - x];
        }
    }
    return ways[target];
}
