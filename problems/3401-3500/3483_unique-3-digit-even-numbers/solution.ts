function totalNumbers(digits: number[]): number {
    // Tally the digit supply once, then walk the 450 candidate numbers
    // (hundreds 1-9, tens 0-9, even units) and keep those whose digit
    // multiset fits the supply.
    const counts: number[] = new Array(10).fill(0);
    for (const d of digits) {
        counts[d] += 1;
    }
    let total = 0;
    for (let h = 1; h <= 9; h++) {
        for (let t = 0; t <= 9; t++) {
            for (const u of [0, 2, 4, 6, 8]) {
                const need: number[] = new Array(10).fill(0);
                need[h] += 1;
                need[t] += 1;
                need[u] += 1;
                if (need.every((n, v) => n <= counts[v])) {
                    total += 1;
                }
            }
        }
    }
    return total;
}
