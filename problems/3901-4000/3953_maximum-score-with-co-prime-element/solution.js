var maxScore = function (a, M) {
    let N = M;
    for (const x of a) N = Math.max(N, x);
    let f = Array(N + 1).fill(0);
    for (const x of a) f[x]++;
    let d = Array(N + 1).fill(0);
    for (let z = 1; z <= N; z++) for (let x = z; x <= N; x += z) d[z] += f[x];
    let sp = [...Array(N + 1).keys()];
    for (let p = 2; p * p <= N; p++) if (sp[p] === p) for (let x = p * p; x <= N; x += p) if (sp[x] === x) sp[x] = p;
    let ans = -1e9;
    for (let x = 1; x <= N; x++) {
        if (!f[x] && x > M) continue;
        let ps = [],
            v = x;
        while (v > 1) {
            let p = sp[v];
            ps.push(p);
            while (v % p === 0) v /= p;
        }
        let bad = 0;
        for (let mask = 1; mask < 1 << ps.length; mask++) {
            let z = 1,
                b = 0;
            for (let i = 0; i < ps.length; i++)
                if ((mask >> i) & 1) {
                    z *= ps[i];
                    b++;
                }
            bad += (b & 1 ? 1 : -1) * d[z];
        }
        let cost = f[x] ? bad - (x > 1 ? 1 : 0) : Math.max(1, bad);
        ans = Math.max(ans, x - cost);
    }
    return ans;
};
