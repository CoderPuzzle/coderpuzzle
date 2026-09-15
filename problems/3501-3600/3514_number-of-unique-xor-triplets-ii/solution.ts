function uniqueXorTriplets(nums: number[]): number {
    // The ordering i <= j <= k only picks which indices feed the XOR, and
    // XOR ignores order, so every triplet value is (pair XOR) ^ (third
    // element). Collect all pairwise XORs once, then spread them by every
    // element; values stay below 2^11, so both sets hold <= 2048 entries.
    const pairs = new Set<number>();
    for (const a of nums) {
        for (const b of nums) {
            pairs.add(a ^ b);
        }
    }
    const triplets = new Set<number>();
    for (const p of pairs) {
        for (const v of nums) {
            triplets.add(p ^ v);
        }
    }
    return triplets.size;
}
