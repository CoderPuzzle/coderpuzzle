function maxWeight(weights: number[], w1: number, w2: number): number {
    // Row a is one wide integer whose bit j marks state (a, j) as reachable:
    // bag 1 filled to exactly a, bag 2 to exactly j. BigInt stands in for the
    // machine word — w2 + 1 states would overflow a double's exact range.
    let lowMask = 0n;
    for (let b = 0; b <= w2; b++) {
        lowMask |= 1n << BigInt(b);
    }
    const rows = Array.from({ length: w1 + 1 }, () => 0n);
    rows[0] = 1n;
    for (const w of weights) {
        const width = BigInt(w);
        // Bag-2 placements shift a whole row left, trimmed to the legal
        // occupancies. Stage them before the bag-1 pass below touches rows,
        // so both moves read the previous item's states only.
        const shifted: bigint[] = [];
        for (let a = 0; a <= w1; a++) {
            shifted.push((rows[a] << width) & lowMask);
        }
        // Bag-1 placements OR row a - w into row a, walked downward so the
        // merge reads pre-item rows and no item is spent twice.
        for (let a = w1; a >= w; a--) {
            rows[a] |= rows[a - w];
        }
        for (let a = 0; a <= w1; a++) {
            rows[a] |= shifted[a];
        }
    }
    let best = 0;
    for (let a = 0; a <= w1; a++) {
        if (rows[a] !== 0n) {
            // Fixed a: the best partner is the highest reachable bit.
            best = Math.max(best, a + rows[a].toString(2).length - 1);
        }
    }
    return best;
}
