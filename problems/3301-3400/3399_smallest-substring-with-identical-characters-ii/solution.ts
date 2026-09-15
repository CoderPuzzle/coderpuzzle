function minLength(s: string, numOps: number): number {
    // Binary search the answer m. m == 1 needs full alternation, so the cost
    // is the smaller Hamming distance to one of the two alternating targets;
    // for m >= 2 a run of length L independently costs floor(L / (m + 1))
    // flips, all placeable strictly inside the run so runs never merge.
    const n = s.length;
    const ok = (m: number): boolean => {
        if (m === 1) {
            let alt = 0;
            for (let i = 0; i < n; i++) {
                if (s[i] !== "01"[i % 2]) {
                    alt++;
                }
            }
            return Math.min(alt, n - alt) <= numOps;
        }
        let flips = 0;
        let run = 1;
        for (let i = 1; i < n; i++) {
            if (s[i] === s[i - 1]) {
                run++;
            } else {
                flips += Math.floor(run / (m + 1));
                run = 1;
            }
        }
        return flips + Math.floor(run / (m + 1)) <= numOps;
    };
    let lo = 1;
    let hi = n;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ok(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
