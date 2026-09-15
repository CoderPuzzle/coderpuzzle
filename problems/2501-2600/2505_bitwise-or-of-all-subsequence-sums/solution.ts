function subsequenceSumOr(nums: number[]): number {
    // Each element and each running prefix is itself a subsequence sum, and
    // together they carry every bit the full OR can raise. Prefixes reach
    // 10^5 * 10^9 = 10^14 < 2^53, so Number arithmetic stays exact, but |
    // truncates to 32 bits — fold values in as two exact 30-bit halves.
    const HALF = 1073741824; // 2^30
    const or64 = (a: number, b: number): number =>
        (Math.floor(a / HALF) | Math.floor(b / HALF)) * HALF + ((a % HALF) | (b % HALF));
    let ans = 0;
    let pre = 0;
    for (const x of nums) {
        pre += x;
        ans = or64(or64(ans, x), pre);
    }
    return ans;
}
