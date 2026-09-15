/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
var countSubTrees = function (n, edges, labels) {
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

    // counts[i] tallies, per letter, how many nodes folded into i's
    // subtree so far carry that letter.
    const counts = Array.from({ length: n }, () => new Array(26).fill(0));
    for (let i = 0; i < n; i++) {
        counts[i][labels.charCodeAt(i) - 97]++;
    }

    // Reverse breadth-first order folds children into parents only after
    // every one of their own descendants has already folded in.
    for (let idx = n - 1; idx > 0; idx--) {
        const u = order[idx];
        const p = parent[u];
        for (let c = 0; c < 26; c++) {
            counts[p][c] += counts[u][c];
        }
    }

    const ans = new Array(n);
    for (let i = 0; i < n; i++) {
        ans[i] = counts[i][labels.charCodeAt(i) - 97];
    }
    return ans;
};
