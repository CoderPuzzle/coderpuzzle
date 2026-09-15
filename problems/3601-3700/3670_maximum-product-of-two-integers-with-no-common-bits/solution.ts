function maxProduct(nums: number[]): number {
    // Every value fits in 20 bits, so each number doubles as its own
    // bitmask; "no common set bits" means the partner's mask is a subset
    // of this mask's complement within those 20 bits.
    let width = 1;
    for (const v of nums) {
        let w = 0;
        for (let x = v; x > 0; x >>= 1) {
            w++;
        }
        if (w > width) {
            width = w;
        }
    }
    const size = 1 << width;
    // dp[m] starts as the largest value whose set bits are exactly m (0
    // when no element carries mask m).
    const dp = new Int32Array(size);
    for (const v of nums) {
        if (v > dp[v]) {
            dp[v] = v;
        }
    }
    // Subset-max sweep: a mask holding bit b absorbs its b-cleared twin;
    // afterwards dp[m] is the largest value whose set bits are a subset
    // of m.
    for (let b = 0; b < width; b++) {
        const bit = 1 << b;
        for (let m = 0; m < size; m++) {
            if ((m & bit) !== 0 && dp[m ^ bit] > dp[m]) {
                dp[m] = dp[m ^ bit];
            }
        }
    }
    // A disjoint partner of v must carry a mask that is a subset of
    // FULL ^ mv, so dp holds the best partner directly. Products reach
    // only ~10^12, far below 2^53, so plain numbers multiply exactly.
    const full = size - 1;
    let best = 0;
    for (const v of nums) {
        const prod = v * dp[full ^ v];
        if (prod > best) {
            best = prod;
        }
    }
    return best;
}
