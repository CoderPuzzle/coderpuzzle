var minTimeMaxPower = function (n, edges, power, cost, source, target) {
    const g = Array.from({ length: n }, () => []);
    for (const [u, v, t] of edges) g[u].push([v, t]);
    const w = power + 1,
        d = new Float64Array(n * w);
    d.fill(Infinity);
    d[source * w + power] = 0;
    const q = [[0, source, power]];
    function push(a) {
        q.push(a);
        let i = q.length - 1;
        while (i) {
            let p = (i - 1) >> 1;
            if (q[p][0] <= a[0]) break;
            q[i] = q[p];
            i = p;
        }
        q[i] = a;
    }
    function pop() {
        const z = q[0],
            a = q.pop();
        if (q.length) {
            let i = 0;
            while (i * 2 + 1 < q.length) {
                let c = i * 2 + 1;
                if (c + 1 < q.length && q[c + 1][0] < q[c][0]) c++;
                if (q[c][0] >= a[0]) break;
                q[i] = q[c];
                i = c;
            }
            q[i] = a;
        }
        return z;
    }
    while (q.length) {
        const [x, u, p] = pop();
        if (x !== d[u * w + p]) continue;
        if (p >= cost[u]) {
            const np = p - cost[u];
            for (const [v, t] of g[u])
                if (x + t < d[v * w + np]) {
                    d[v * w + np] = x + t;
                    push([x + t, v, np]);
                }
        }
    }
    let z = Infinity;
    for (let p = 0; p <= power; p++) z = Math.min(z, d[target * w + p]);
    if (z === Infinity) return [-1, -1];
    for (let p = power; p >= 0; p--) if (d[target * w + p] === z) return [z, p];
};
