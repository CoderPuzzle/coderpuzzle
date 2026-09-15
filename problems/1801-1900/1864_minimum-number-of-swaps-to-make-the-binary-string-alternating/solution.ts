function minSwaps(s: string): number {
    // Only the two canonical alternating patterns are targets. Each swap
    // fixes exactly two mismatched positions, so a pattern costs mismatches
    // divided by two; take the cheaper count-feasible pattern.
    const n = s.length;
    let ones = 0;
    for (let i = 0; i < n; i++) {
        ones += s.charCodeAt(i) - 48;
    }
    if (Math.abs(2 * ones - n) > 1) {
        return -1;
    }
    let best = -1;
    for (let start = 0; start <= 1; start++) {
        const patternOnes = start === 0 ? Math.ceil(n / 2) : Math.floor(n / 2);
        if (patternOnes !== ones) {
            continue;
        }
        let mism = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] !== String((i & 1) ^ start ^ 1)) {
                mism++;
            }
        }
        const cost = mism / 2;
        if (best < 0 || cost < best) {
            best = cost;
        }
    }
    return best;
}
