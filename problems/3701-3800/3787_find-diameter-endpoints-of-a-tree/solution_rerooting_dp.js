/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {string}
 */
var findSpecialNodes = function (n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Root at node 0 and sweep once for a BFS order plus parents: children
    // always sit after their parent in the order, and both passes lean on it.
    const parent = new Array(n).fill(-1);
    const order = [0];
    for (let head = 0; head < order.length; head++) {
        const u = order[head];
        for (const v of adj[u]) {
            if (v !== parent[u]) {
                parent[v] = u;
                order.push(v);
            }
        }
    }

    // Down pass, over the order reversed so each child is final before its
    // parent reads it: down[v] is the height of v's subtree. The top two
    // child chains ride along because the up pass must route around a
    // parent's best arm when the path re-enters through that arm.
    const down = new Array(n).fill(0);
    const second = new Array(n).fill(0);
    const bestChild = new Array(n).fill(-1);
    for (let i = order.length - 1; i >= 0; i--) {
        const v = order[i];
        const p = parent[v];
        if (p >= 0) {
            const chain = down[v] + 1;
            if (chain > down[p]) {
                second[p] = down[p];
                down[p] = chain;
                bestChild[p] = v;
            } else if (chain > second[p]) {
                second[p] = chain;
            }
        }
    }

    // Up pass, forward over the order: up[v] is the longest path leaving
    // v's subtree through its parent, and max(down[v], up[v]) is v's
    // eccentricity. A sibling arm stands in for the parent's best arm
    // exactly when v owns that arm, which is why second was kept.
    const up = new Array(n).fill(0);
    let diameter = 0;
    for (const v of order) {
        const p = parent[v];
        if (p >= 0) {
            const arm = v === bestChild[p] ? second[p] : down[p];
            up[v] = Math.max(up[p], arm) + 1;
        }
        diameter = Math.max(diameter, down[v], up[v]);
    }

    // A node terminates a diameter exactly when its eccentricity equals
    // the tree's widest path, so compare and print.
    let res = "";
    for (let i = 0; i < n; i++) {
        res += Math.max(down[i], up[i]) === diameter ? "1" : "0";
    }
    return res;
};
