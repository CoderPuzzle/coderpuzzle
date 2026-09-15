function singleNumber(nums: number[]): number {
    // XOR fold: x ^ x = 0 cancels each pair, x ^ 0 = x passes the lone
    // value through, and commutativity makes grouping order irrelevant.
    let result = 0;
    for (const value of nums) {
        result ^= value;
    }
    // Only the unpaired element survives in the accumulator.
    return result;
}
