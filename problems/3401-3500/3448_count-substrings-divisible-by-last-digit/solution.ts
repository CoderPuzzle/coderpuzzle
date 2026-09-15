function countSubstrings(s: string): number {
    const digits: number[] = new Array(s.length);
    for (let i = 0; i < s.length; i++) digits[i] = s.charCodeAt(i) - 48;
    let total = 0;
    // One independent pass per candidate last digit d; the passes sum.
    // cnt[r] counts suffixes of the already-processed prefix whose value
    // is congruent to r modulo d.
    for (let d = 1; d < 10; d++) {
        let cnt: number[] = new Array(d).fill(0);
        for (let i = 0; i < digits.length; i++) {
            const di = digits[i];
            // Extending a suffix of remainder r by this digit d yields
            // r*10 + d, divisible exactly when (r * 10) % d == 0; the +1
            // covers the single-character substring "d".
            if (di === d) {
                for (let r = 0; r < d; r++) {
                    if ((r * 10) % d === 0) {
                        total += cnt[r];
                    }
                }
                total += 1;
            }
            // Remap every suffix: appending di sends remainder r to
            // (10*r + di) % d, and di alone starts a fresh suffix.
            const newCnt: number[] = new Array(d).fill(0);
            for (let r = 0; r < d; r++) {
                if (cnt[r] !== 0) {
                    newCnt[(r * 10 + di) % d] += cnt[r];
                }
            }
            newCnt[di % d] += 1;
            cnt = newCnt;
        }
    }
    return total;
}
