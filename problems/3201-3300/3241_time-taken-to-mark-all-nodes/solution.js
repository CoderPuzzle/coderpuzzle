/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var timeTaken = function (edges) {
    // Reroot DP. Moving into node v costs 1 if v is odd, 2 if v is even.
    const n = edges.length + 1;
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // Iterative DFS ordering rooted at 0.
    const parent = new Array(n).fill(-1);
    parent[0] = -2;
    const order = [];
    const stack = [0];
    while (stack.length > 0) {
        const u = stack.pop();
        order.push(u);
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            parent[v] = u;
            stack.push(v);
        }
    }

    const last = new Array(n).fill(0); // max time within u's subtree
    const lastNo = new Array(n).fill(-1); // child attaining last[u]
    const second = new Array(n).fill(0); // second-best child contribution
    for (let k = order.length - 1; k >= 0; k--) {
        const u = order[k];
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            const t = last[v] + (v % 2 === 0 ? 2 : 1);
            if (last[u] < t) {
                second[u] = last[u];
                last[u] = t;
                lastNo[u] = v;
            } else if (second[u] < t) {
                second[u] = t;
            }
        }
    }

    const answer = last.slice();
    const up = new Array(n).fill(0); // best time outside u's subtree
    for (const u of order) {
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            const base = v === lastNo[u] ? second[u] : last[u];
            const pl = Math.max(up[u], base) + (u % 2 === 0 ? 2 : 1);
            up[v] = pl;
            if (pl > answer[v]) answer[v] = pl;
        }
    }
    return answer;
};
