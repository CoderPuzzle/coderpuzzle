function zigZagArrays(n: number, l: number, r: number): number {
    const MOD = 1e9 + 7;
    const m = r - l + 1;
    // Reflecting the range (x -> l + r - x) swaps "next step must rise" with
    // "must fall" while fixing the all-ones start, so the falling block
    // always mirrors the rising one and one block evolves alone: by the
    // matrix S with S[w][u] = 1 exactly when u + w <= m - 2.
    let s: number[][] = [];
    for (let w = 0; w < m; w++) {
        const row: number[] = new Array(m).fill(0);
        for (let u = 0; u + w <= m - 2; u++) {
            row[u] = 1;
        }
        s.push(row);
    }
    let v: number[] = new Array(m).fill(1);
    // A raw residue product reaches 2^60, past Number's exact range, so each
    // dot product splits its left row into 15-bit low/high halves against a
    // partner row pre-multiplied by 2^15 modulo MOD: both partials stay
    // under 2^45 and a 75-term accumulation under 2^53, exact down to the
    // single final reduction.
    const halves = (row: number[]): [number[], number[]] => {
        const lo: number[] = new Array(m);
        const hi: number[] = new Array(m);
        for (let q = 0; q < m; q++) {
            const x = row[q];
            lo[q] = x % 32768;
            hi[q] = Math.floor(x / 32768);
        }
        return [lo, hi];
    };
    const scaled = (row: number[]): number[] => row.map((x) => (x * 32768) % MOD);
    let k = n - 1;
    while (k > 0) {
        if (k & 1) {
            const vs = scaled(v);
            const nv = new Array(m);
            for (let i = 0; i < m; i++) {
                const [lo, hi] = halves(s[i]);
                let acc = 0;
                for (let q = 0; q < m; q++) {
                    acc += hi[q] * vs[q] + lo[q] * v[q];
                }
                nv[i] = acc % MOD;
            }
            v = nv;
        }
        k >>= 1;
        if (k > 0) {
            // S[w][u] depends only on w + u, so S is symmetric and stays
            // symmetric under powers: square it as its Gram matrix, one
            // triangle at a time.
            const hs = s.map(halves);
            const ss = s.map(scaled);
            const g: number[][] = [];
            for (let i = 0; i < m; i++) {
                g.push(new Array(m).fill(0));
            }
            for (let i = 0; i < m; i++) {
                const [loi, hii] = hs[i];
                for (let j = i; j < m; j++) {
                    const sj = s[j];
                    const ssj = ss[j];
                    let acc = 0;
                    for (let q = 0; q < m; q++) {
                        acc += hii[q] * ssj[q] + loi[q] * sj[q];
                    }
                    g[i][j] = acc % MOD;
                    g[j][i] = g[i][j];
                }
            }
            s = g;
        }
    }
    // The mirrored block doubles the surviving block's mass.
    let total = 0;
    for (const x of v) {
        total += x;
    }
    return (2 * total) % MOD;
}
