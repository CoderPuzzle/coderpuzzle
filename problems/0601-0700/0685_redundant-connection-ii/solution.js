/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function (edges) {
    // First pass: a node with two parents names the two candidate
    // edges, in input order.
    const n = edges.length;
    const parentEdge = new Array(n + 1).fill(-1);
    let cand1 = -1;
    let cand2 = -1;
    for (let i = 0; i < n; i += 1) {
        const v = edges[i][1];
        if (parentEdge[v] !== -1) {
            cand1 = parentEdge[v];
            cand2 = i;
        } else {
            parentEdge[v] = i;
        }
    }

    const dsu = Array.from({ length: n + 1 }, (_, node) => node);

    const find = function (node) {
        let root = node;
        while (dsu[root] !== root) {
            root = dsu[root];
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (dsu[node] !== root) {
            const next = dsu[node];
            dsu[node] = root;
            node = next;
        }
        return root;
    };

    // Second pass over every edge except the later candidate: a cycle
    // means dropping it is not enough, so the earlier edge is the
    // answer; a clean pass means the later edge is.
    for (let i = 0; i < n; i += 1) {
        if (i === cand2) {
            continue;
        }
        const ru = find(edges[i][0]);
        const rv = find(edges[i][1]);
        // Equal roots mean this edge would reconnect one component.
        if (ru === rv) {
            return cand2 !== -1 ? edges[cand1] : edges[i];
        }
        dsu[ru] = rv;
    }
    return edges[cand2];
};
