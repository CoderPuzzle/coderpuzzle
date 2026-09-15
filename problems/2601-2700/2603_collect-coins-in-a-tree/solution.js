/**
 * @param {number[]} coins
 * @param {number[][]} edges
 * @return {number}
 */
var collectTheCoins = function (coins, edges) {
    const n = coins.length;
    const adj = Array.from({ length: n }, () => new Set());
    for (const [a, b] of edges) {
        adj[a].add(b);
        adj[b].add(a);
    }

    // Phase 1: repeatedly remove leaves that carry no coin.
    let leaves = [];
    for (let i = 0; i < n; i++) {
        if (adj[i].size === 1 && coins[i] === 0) leaves.push(i);
    }
    while (leaves.length > 0) {
        const nxt = [];
        for (const u of leaves) {
            if (adj[u].size > 0) {
                const v = adj[u].values().next().value;
                adj[v].delete(u);
                if (adj[v].size === 1 && coins[v] === 0) nxt.push(v);
            }
            adj[u].clear();
        }
        leaves = nxt;
    }

    // Phase 2: drop two more layers of leaves (distance-2 collection).
    for (let round = 0; round < 2; round++) {
        leaves = [];
        for (let i = 0; i < n; i++) {
            if (adj[i].size === 1) leaves.push(i);
        }
        for (const u of leaves) {
            if (adj[u].size > 0) {
                const v = adj[u].values().next().value;
                adj[v].delete(u);
            }
            adj[u].clear();
        }
    }

    let remaining = 0;
    for (let i = 0; i < n; i++) {
        if (adj[i].size > 0) remaining++;
    }
    return Math.max(0, (remaining - 1) * 2);
};
