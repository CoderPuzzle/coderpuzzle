function maximumStrongPairXor(nums: number[]): number {
    // Try every unordered pair (the same integer twice is allowed, so
    // j >= i covers the (x, x) pairs too); keep the best XOR among the
    // pairs that satisfy the strong-pair condition.
    let best = 0;
    for (let i = 0; i < nums.length; ++i) {
        for (let j = i; j < nums.length; ++j) {
            const x = nums[i];
            const y = nums[j];
            if (Math.abs(x - y) <= Math.min(x, y)) {
                best = Math.max(best, x ^ y);
            }
        }
    }
    return best;
}
