/**
 * @param {number[][]} edges
 * @param {number[]} colors
 * @return {number}
 */
var maximumSubtreeSize = function (edges, colors) {
    const n = colors.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Breadth-first order from the root: parents are always recorded
    // before their children, so reading this array backwards visits
    // every child before its parent -- an iterative post-order that
    // never touches the call stack.
    const order = new Array(n).fill(0);
    const parent = new Array(n).fill(-1);
    const visited = new Array(n).fill(false);
    visited[0] = true;
    let head = 0;
    let tail = 1;
    while (head < tail) {
        const u = order[head++];
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                order[tail++] = v;
            }
        }
    }

    // mono[v] says every node in v's subtree so far shares v's color;
    // size[v] is how many nodes that monochrome run holds. A mixed
    // subtree poisons the parent outright; a clean one poisons it on a
    // color mismatch, otherwise it joins the parent's count.
    const mono = new Array(n).fill(true);
    const size = new Array(n).fill(1);
    let best = 1;

    // Reverse breadth-first order folds children into parents only after
    // every one of their own descendants has already folded in.
    for (let idx = n - 1; idx >= 0; idx--) {
        const u = order[idx];
        if (mono[u]) best = Math.max(best, size[u]);
        const p = parent[u];
        if (p !== -1) {
            if (!mono[u] || colors[u] !== colors[p]) {
                mono[p] = false;
            } else {
                size[p] += size[u];
            }
        }
    }
    return best;
};
