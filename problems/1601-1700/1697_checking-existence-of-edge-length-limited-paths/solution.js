/**
 * @param {number} n
 * @param {number[][]} edgeList
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var distanceLimitedPathsExist = function (n, edgeList, queries) {
    const parent = new Array(n);
    for (let i = 0; i < n; i++) {
        parent[i] = i;
    }
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    // Answer offline: the edge sets usable under growing limits are nested,
    // so union-find only ever grows. Sorting query indices (not the
    // queries) lets answers return to their original positions.
    const edges = edgeList.slice().sort((a, b) => a[2] - b[2]);
    const order = queries.map((_, i) => i).sort((a, b) => queries[a][2] - queries[b][2]);
    const answer = new Array(queries.length).fill(false);
    let ei = 0;
    for (const qi of order) {
        const p = queries[qi][0];
        const q = queries[qi][1];
        const limit = queries[qi][2];
        // Union every edge strictly below the limit — the strict < excludes
        // edges of weight exactly equal to it.
        while (ei < edges.length && edges[ei][2] < limit) {
            const ra = find(edges[ei][0]);
            const rb = find(edges[ei][1]);
            if (ra !== rb) {
                parent[ra] = rb;
            }
            ei++;
        }
        // The query reduces to a connectivity check.
        answer[qi] = find(p) === find(q);
    }
    return answer;
};
