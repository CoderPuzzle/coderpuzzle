function threeSumMulti(arr: number[], target: number): number {
    // Count occurrences of each value, then enumerate value pairs
    // (a, b) with a <= b; the required third value c = target - a - b
    // is accepted only when c >= b, so each unordered value multiset
    // {a, b, c} is priced exactly once. The index count is C(ca, 3)
    // when a == b == c, C(ca, 2) * cc or ca * C(cb, 2) when exactly
    // two coincide, and ca * cb * cc when all three differ — each
    // term reduced mod 10^9 + 7 as it is added, since C(3000, 3) is
    // far past 32 bits before the modulus ever fires.
    const MOD = 1_000_000_007;
    const counts = new Map<number, number>();
    for (const value of arr) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    const values = [...counts.keys()].sort((x, y) => x - y);
    let total = 0;
    for (let i = 0; i < values.length; ++i) {
        const a = values[i];
        const ca = counts.get(a)!;
        for (let j = i; j < values.length; ++j) {
            const b = values[j];
            const c = target - a - b;
            if (c < b) {
                break;
            }
            const cc = counts.get(c);
            if (cc === undefined) {
                continue;
            }
            const cb = counts.get(b)!;
            let term: number;
            if (a === b && b === c) {
                term = (ca * (ca - 1) * (ca - 2)) / 6;
            } else if (a === b) {
                term = ((ca * (ca - 1)) / 2) * cc;
            } else if (b === c) {
                term = (ca * (cb * (cb - 1))) / 2;
            } else {
                term = ca * cb * cc;
            }
            total = (total + term) % MOD;
        }
    }
    return total;
}
