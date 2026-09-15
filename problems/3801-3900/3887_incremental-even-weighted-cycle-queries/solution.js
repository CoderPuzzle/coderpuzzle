/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var numberOfEdgesAdded = function (n, edges) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = new Array(n).fill(0);
    const par = new Array(n).fill(0); // xor distance from node to its parent

    // returns [root, xor from x to root]
    const find = (x) => {
        const path = [];
        let cur = x;
        while (parent[cur] !== cur) {
            path.push(cur);
            cur = parent[cur];
        }
        const root = cur;
        let xr = 0;
        for (let i = path.length - 1; i >= 0; i--) {
            const node = path[i];
            xr ^= par[node];
            parent[node] = root;
            par[node] = xr;
        }
        return [root, xr];
    };

    let added = 0;
    for (const [u, v, w] of edges) {
        const [ru, xu] = find(u);
        const [rv, xv] = find(v);
        if (ru === rv) {
            if ((xu ^ xv) === w) added++;
        } else {
            const rel = xu ^ xv ^ w;
            if (rank[ru] < rank[rv]) {
                parent[ru] = rv;
                par[ru] = rel;
            } else if (rank[ru] > rank[rv]) {
                parent[rv] = ru;
                par[rv] = rel;
            } else {
                parent[ru] = rv;
                par[ru] = rel;
                rank[rv]++;
            }
            added++;
        }
    }
    return added;
};
