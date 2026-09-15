/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var numberOfEdgesAdded = function (n, edges) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const size = new Array(n).fill(1);
    const color = new Array(n).fill(0); // absolute color of each node
    const members = Array.from({ length: n }, (_, i) => [i]); // per-root member lists

    // membership only: path halving, no parity bookkeeping
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    let added = 0;
    for (const [u, v, w] of edges) {
        let ru = find(u);
        let rv = find(v);
        if (ru === rv) {
            // the standing path parity is color[u] ^ color[v]: an O(1) verdict
            if ((color[u] ^ color[v]) === w) added++;
        } else {
            if (size[ru] < size[rv]) {
                [ru, rv] = [rv, ru]; // ru is now the larger root
            }
            if ((color[u] ^ color[v]) !== w) {
                // recolor the smaller component: every relation inside it
                // survives a uniform flip, while the new edge's demand flips
                for (const m of members[rv]) color[m] ^= 1;
            }
            parent[rv] = ru;
            size[ru] += size[rv];
            members[ru].push(...members[rv]);
            added++;
        }
    }
    return added;
};
