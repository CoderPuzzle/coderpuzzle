function longestSubsequence(nums: number[]): number {
    // XOR is self-inverse and order-free, so the whole array's XOR decides
    // everything: non-zero means take all of it.
    let total = 0;
    let seenNonzero = false;
    for (const value of nums) {
        total ^= value;
        seenNonzero = seenNonzero || value !== 0;
    }
    // A zero total is repaired by dropping one non-zero element (the rest
    // then XORs to that element); all zeros leave nothing worth taking.
    if (total !== 0) {
        return nums.length;
    }
    return seenNonzero ? nums.length - 1 : 0;
}
