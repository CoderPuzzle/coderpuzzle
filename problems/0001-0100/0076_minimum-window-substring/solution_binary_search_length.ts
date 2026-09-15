function minWindow(s: string, t: string): string {
    if (t.length === 0 || t.length > s.length) return "";
    const quota = new Int32Array(128);
    let kinds = 0;
    for (const ch of t) {
        if (quota[ch.charCodeAt(0)]++ === 0) kinds++;
    }
    // Slide one window of exactly `length` across s. `below` counts
    // demanded letters still short of quota, so below === 0 means this
    // window covers t; letters absent from t never touch it.
    const covers = (length: number): number => {
        const have = new Int32Array(128);
        let below = kinds;
        for (let i = 0; i < length; i++) {
            const c = s.charCodeAt(i);
            if (quota[c] > 0 && ++have[c] === quota[c]) below--;
        }
        if (below === 0) return 0;
        for (let start = 1; start + length <= s.length; start++) {
            const inCode = s.charCodeAt(start + length - 1);
            if (quota[inCode] > 0 && ++have[inCode] === quota[inCode]) below--;
            const outCode = s.charCodeAt(start - 1);
            // Dropping from exactly-at-quota to one short reopens the
            // debt; deeper surpluses change nothing.
            if (quota[outCode] > 0 && have[outCode]-- === quota[outCode]) below++;
            if (below === 0) return start;
        }
        return -1;
    };
    // Coverage is monotone in the length: a covering window of length L
    // sits inside a covering window of length L + 1, so "some window of
    // length L covers t" is false below the answer and true from it
    // upward. Binary search for the smallest surviving length.
    let lo = t.length,
        hi = s.length;
    let bestStart = -1,
        bestLen = -1;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const start = covers(mid);
        if (start >= 0) {
            bestStart = start;
            bestLen = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    // Within the minimal length the scan reports the leftmost cover, the
    // same window the shrinking sweep settles on.
    return bestStart < 0 ? "" : s.slice(bestStart, bestStart + bestLen);
}
