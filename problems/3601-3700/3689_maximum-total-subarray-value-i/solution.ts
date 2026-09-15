function maxTotalValue(nums: number[], k: number): number {
    // No subarray can beat the whole array: it sees only a subset of the
    // elements, so its maximum never exceeds the global maximum and its
    // minimum never drops below the global minimum. Repeating the whole
    // array as every pick attains that spread k times. Products reach
    // 10^14, still exact in doubles (below 2^53).
    let lo = Infinity;
    let hi = -Infinity;
    for (const x of nums) {
        lo = Math.min(lo, x);
        hi = Math.max(hi, x);
    }
    return (hi - lo) * k;
}
