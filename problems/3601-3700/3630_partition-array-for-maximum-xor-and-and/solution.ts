function maximizeXorAndXor(nums: number[]): number {
    // Enumerate the AND-subset B over all 2^n masks. Two subset tables
    // give AND(B) (all-ones identity, read as 0 for the empty subset
    // per the statement) and XOR(B). With s = XOR of the pool (indices
    // outside B), the best A/C split maximizes x + (s ^ x) over subset
    // XORs x of the pool, and x + (s ^ x) = s + 2 * (x & ~s), so a
    // linear basis over the pool values masked with ~s answers it
    // greedily from the top bit. The bound and(B) + s + 2 * (~s & MASK)
    // prunes most subsets once the incumbent is strong. Sums reach
    // ~3.2e9 < 2^53, so Number math is exact.
    const n = nums.length;
    const size = 1 << n;
    const full = (1 << 30) - 1;
    const andDp = new Int32Array(size);
    andDp[0] = full; // AND identity; the empty subset reads as 0 below
    const xorDp = new Int32Array(size);
    for (let subset = 1; subset < size; ++subset) {
        const low = subset & -subset;
        const j = 31 - Math.clz32(low);
        andDp[subset] = andDp[subset ^ low] & nums[j];
        xorDp[subset] = xorDp[subset ^ low] ^ nums[j];
    }
    let best = 0;
    const basis = new Int32Array(30);
    for (let b = 0; b < size; ++b) {
        const s = xorDp[size - 1] ^ xorDp[b];
        const t = ~s & full;
        const andB = b === 0 ? 0 : andDp[b];
        if (andB + s + 2 * t <= best) continue;
        const inv = ~s;
        basis.fill(0);
        for (let j = 0; j < n; ++j) {
            if ((b >> j) & 1) continue;
            let w = nums[j] & inv;
            while (w !== 0) {
                const p = 31 - Math.clz32(w);
                const top = basis[p];
                if (top !== 0) {
                    w ^= top;
                } else {
                    basis[p] = w;
                    break;
                }
            }
        }
        let x = 0;
        for (let p = 29; p >= 0; --p) {
            if (basis[p] !== 0 && ((x >> p) & 1) === 0) x ^= basis[p];
        }
        const val = andB + s + 2 * x;
        if (val > best) best = val;
    }
    return best;
}
