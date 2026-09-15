/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} group
 * @return {number}
 */
var interactionCosts = function (n, edges, group) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // Breadth-first order from the root; parents discovered on the way.
    const parent = new Array(n).fill(-1);
    const order = [0];
    for (let head = 0; head < order.length; ++head) {
        const node = order[head];
        for (const nxt of adj[node]) {
            if (nxt !== parent[node]) {
                parent[nxt] = node;
                order.push(nxt);
            }
        }
    }

    // Global size of each group label.
    const k = new Array(n + 1).fill(0);
    for (const g of group) {
        k[g]++;
    }

    // Each subtree state carries its group-count map plus
    // A = sum k[g]*cnt[g] and B = sum cnt[g]^2.
    const states = new Array(n).fill(null);
    let ans = 0;
    for (let i = n - 1; i >= 0; --i) {
        const v = order[i];
        const pv = parent[v];

        let base = null;
        for (const c of adj[v]) {
            if (c !== pv && (base === null || states[c].m.size > base.m.size)) {
                base = states[c];
            }
        }
        if (base === null) {
            base = { m: new Map(), a: 0, b: 0 };
        }
        const { m } = base;

        const g = group[v];
        m.set(g, (m.get(g) || 0) + 1);
        base.a += k[g];
        base.b += 2 * (m.get(g) - 1) + 1;

        for (const c of adj[v]) {
            if (c === pv || states[c] === base) {
                continue;
            }
            for (const [gg, cc] of states[c].m) {
                const old = m.get(gg) || 0;
                base.a += k[gg] * cc;
                base.b += 2 * old * cc + cc * cc;
                m.set(gg, old + cc);
            }
            states[c].m.clear();
        }

        if (v !== 0) {
            // The edge above v carries sum of cnt*(k-cnt) = a - b.
            ans += base.a - base.b;
        }
        states[v] = base;
    }
    return ans;
};
