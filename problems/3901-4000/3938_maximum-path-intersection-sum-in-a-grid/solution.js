var maxScore = function (g) {
    let ans = -Infinity;
    function scan(a) {
        let e = a[0];
        for (let i = 1; i < a.length; i++) {
            let z = e + a[i];
            ans = Math.max(ans, z);
            e = Math.max(a[i], z);
        }
    }
    for (const r of g) scan(r);
    for (let j = 0; j < g[0].length; j++) scan(g.map((r) => r[j]));
    for (let i = 1; i + 1 < g.length; i++) for (let j = 1; j + 1 < g[0].length; j++) ans = Math.max(ans, g[i][j]);
    return ans;
};
