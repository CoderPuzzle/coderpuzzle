var interleaveCharacters = function (a, b, t) {
    const M = 1000000007,
        n = a.length,
        m = b.length;
    let d = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    d[0][0] = 1;
    for (const ch of t) {
        const e = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
        for (let j = 0; j <= m; j++) {
            let run = 0;
            for (let i = 0; i <= n; i++) {
                run = (run + d[i][j]) % M;
                if (i < n && a[i] === ch) e[i + 1][j] = (e[i + 1][j] + run) % M;
            }
        }
        for (let i = 0; i <= n; i++) {
            let run = 0;
            for (let j = 0; j <= m; j++) {
                run = (run + d[i][j]) % M;
                if (j < m && b[j] === ch) e[i][j + 1] = (e[i][j + 1] + run) % M;
            }
        }
        d = e;
    }
    let z = 0;
    for (const r of d) for (const x of r) z = (z + x) % M;
    function sub(w) {
        const x = Array(t.length + 1).fill(0);
        x[0] = 1;
        for (const c of w) for (let j = t.length - 1; j >= 0; j--) if (t[j] === c) x[j + 1] = (x[j + 1] + x[j]) % M;
        return x.at(-1);
    }
    return (z - sub(a) - sub(b) + 2 * M) % M;
};
