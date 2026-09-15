/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var minimumCost = function (n, edges, query) {
    // Walks may repeat edges, so the optimum ANDs in every edge of the component.
    const parent = Array.from({ length: n }, (_, i) => i);
    const size = new Array(n).fill(1);

    // Union-find: path halving in find, union by size in union.
    function find(x) {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    function union(a, b) {
        let ra = find(a),
            rb = find(b);
        if (ra === rb) {
            return ra;
        }
        if (size[ra] < size[rb]) {
            const tmp = ra;
            ra = rb;
            rb = tmp;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
        return ra;
    }

    for (const [u, v] of edges) {
        union(u, v);
    }

    // AND every edge weight into its component, keyed by root.
    const compAnd = new Map();
    for (const [u, v, w] of edges) {
        const r = find(u);
        if (!compAnd.has(r)) {
            compAnd.set(r, w);
        } else {
            compAnd.set(r, compAnd.get(r) & w);
        }
    }

    // Different roots mean no walk exists; same root answers with the AND.
    const ans = [];
    for (const [s, t] of query) {
        const rs = find(s),
            rt = find(t);
        if (rs !== rt) {
            ans.push(-1);
        } else {
            ans.push(compAnd.get(rs));
        }
    }
    return ans;
};
