/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var minTime = function (n, edges, k) {
    const parent = new Array(n);
    for (let i = 0; i < n; i++) parent[i] = i;

    function find(x) {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    function union(a, b) {
        const ra = find(a),
            rb = find(b);
        if (ra === rb) return false;
        parent[ra] = rb;
        return true;
    }

    // Reverse Kruskal: sweep edges from longest-lived to shortest so the
    // union-find mirrors the graph with every edge of time <= t removed.
    const ordered = edges.slice().sort((e1, e2) => e2[2] - e1[2]);
    let components = n;
    let answer = 0;
    let i = 0;
    const m = ordered.length;
    while (i < m) {
        const t = ordered[i][2];
        // Pre-merge state: every edge of time <= t is gone. If the count
        // already reaches k, t works; later overwrites keep the minimum.
        if (components >= k) answer = t;
        // Merge the whole equal-time group so a partially merged group is
        // never mistaken for a valid intermediate state.
        while (i < m && ordered[i][2] === t) {
            const u = ordered[i][0],
                v = ordered[i][1];
            // A redundant edge (no-op union) does not decrement the count.
            if (union(u, v)) components--;
            i++;
        }
    }
    // The full graph itself may already have >= k components: answer 0.
    if (components >= k) answer = 0;
    return answer;
};
