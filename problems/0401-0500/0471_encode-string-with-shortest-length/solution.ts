function encode(s: string): string {
    const n = s.length;
    const dp: string[][] = [];
    for (let i = 0; i < n; i++) {
        dp.push(new Array(n).fill(""));
    }
    // dp[i][j] = shortest encoding of s[i..j]; growing interval lengths
    // guarantee every subinterval is solved before it is needed.
    for (let length = 1; length <= n; length++) {
        for (let i = 0; i + length <= n; i++) {
            const j = i + length - 1;
            const substr = s.slice(i, j + 1);
            // Candidate 1: keep the substring verbatim.
            let best = substr;
            // Candidate 2: split in two, concatenate optimal encodings.
            for (let k = i; k < j; k++) {
                const candidate = dp[i][k] + dp[k + 1][j];
                if (candidate.length < best.length) best = candidate;
            }
            let compression: string | null = null;
            // Candidate 3: k[pattern] when a period divides the interval.
            // Embedding the pattern's own encoding (not raw text) gives
            // nested forms like 4[2[a]] for free.
            for (let p = 1; p < length; p++) {
                if (length % p === 0) {
                    const pattern = s.slice(i, i + p);
                    if (pattern.repeat(length / p) === substr) {
                        const encoded = String(length / p) + "[" + dp[i][i + p - 1] + "]";
                        if (compression === null || encoded.length < compression.length) {
                            compression = encoded;
                        }
                    }
                }
            }
            // Encode only if strictly shorter — or tied against an
            // already-encoded best; a tie with the raw text keeps the text
            // ("aaa" stays "aaa", "aaaaa" becomes "5[a]").
            if (compression !== null) {
                if (compression.length < best.length || (compression.length === best.length && best !== substr)) {
                    best = compression;
                }
            }
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];
}
