/**
 * @param {number[][]} edges
 * @param {number} bob
 * @param {number[]} amount
 * @return {number}
 */
var mostProfitablePath = function (edges, bob, amount) {
    const n = amount.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // One BFS from the root orients the tree: depth[u] is Alice's
    // arrival time, and order lists every node after its parent.
    const parent = new Array(n).fill(-1);
    const depth = new Array(n).fill(0);
    const seen = new Array(n).fill(false);
    seen[0] = true;
    const order = [];
    const queue = [0];
    let head = 0;
    while (head < queue.length) {
        const u = queue[head++];
        order.push(u);
        for (const v of adj[u]) {
            if (!seen[v]) {
                seen[v] = true;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                queue.push(v);
            }
        }
    }

    // Bob has no choices: walk his unique path to the root, recording
    // his arrival time at each node along it.
    const bobTime = new Map();
    let t = 0;
    let node = bob;
    while (node !== -1) {
        bobTime.set(node, t);
        t++;
        node = parent[node];
    }

    // BFS order makes income[parent] final before u, so each root-to-node
    // path sum builds in one sweep. gain compares arrivals: Bob later or
    // absent -> full amount; simultaneous -> half (exact: amounts are
    // even); Bob earlier -> gate already open, 0.
    const income = new Array(n).fill(0);
    let best = null;
    for (const u of order) {
        const d = depth[u];
        const bt = bobTime.get(u);
        let gain;
        if (bt === undefined || bt > d) {
            gain = amount[u];
        } else if (bt === d) {
            gain = Math.floor(amount[u] / 2);
        } else {
            gain = 0;
        }
        income[u] = (u !== 0 ? income[parent[u]] : 0) + gain;
        // Alice must keep moving, so she stops at a leaf: a non-root
        // node with exactly one neighbor.
        if (u !== 0 && adj[u].length === 1) {
            if (best === null || income[u] > best) best = income[u];
        }
    }
    return best;
};
