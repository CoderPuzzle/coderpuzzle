var shortestPath = function (n, edges, labels, k) {
    const g = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) g[u].push([v, w]);
    const w = k + 1,
        d = new Float64Array(n * w);
    d.fill(Infinity);
    d[1] = 0;
    const q = [[0, 0, 1]];
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
        const [x, u, c] = pop();
        if (x !== d[u * w + c]) continue;
        for (const [v, cost] of g[u]) {
            const nc = labels[u] === labels[v] ? c + 1 : 1,
                z = x + cost;
            if (nc <= k && z < d[v * w + nc]) {
                d[v * w + nc] = z;
                push([z, v, nc]);
            }
        }
    }
    let z = Infinity;
    for (let c = 1; c <= k; c++) z = Math.min(z, d[(n - 1) * w + c]);
    return z === Infinity ? -1 : z;
};
