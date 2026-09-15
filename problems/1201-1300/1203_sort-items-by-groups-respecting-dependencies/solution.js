/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function (n, m, group, beforeItems) {
    group = group.slice();
    for (let i = 0; i < n; i++) {
        if (group[i] === -1) {
            group[i] = m;
            m++;
        }
    }

    const itemAdj = Array.from({ length: n }, () => []);
    const groupAdj = Array.from({ length: m }, () => []);
    const groupIndeg = new Array(m).fill(0);
    for (let i = 0; i < n; i++) {
        for (const b of beforeItems[i]) {
            itemAdj[b].push(i);
            const gb = group[b],
                gi = group[i];
            if (gb !== gi) {
                groupAdj[gb].push(gi);
                groupIndeg[gi]++;
            }
        }
    }

    // LIFO Kahn: stack initialized in descending id order so the smallest
    // zero-indegree id pops first; newly available nodes are pushed on top.
    const kahn = function (keys, adj, indeg) {
        const ind = indeg.slice();
        const available = [];
        for (const k of keys) {
            if (ind[k] === 0) available.push(k);
        }
        available.sort((a, b) => b - a);
        const order = [];
        while (available.length > 0) {
            const u = available.pop();
            order.push(u);
            for (const v of adj[u]) {
                if (--ind[v] === 0) available.push(v);
            }
        }
        return order.length === keys.length ? order : null;
    };

    const keys = [];
    for (let g = 0; g < m; g++) keys.push(g);
    const groupOrder = kahn(keys, groupAdj, groupIndeg);
    if (groupOrder === null) return [];

    const itemsInGroup = Array.from({ length: m }, () => []);
    for (let i = 0; i < n; i++) itemsInGroup[group[i]].push(i);

    const result = [];
    const indeg2 = new Array(n).fill(0);
    const adj2 = Array.from({ length: n }, () => []);
    for (const g of groupOrder) {
        const nodes = itemsInGroup[g];
        if (nodes.length === 0) continue;
        for (const u of nodes) {
            indeg2[u] = 0;
            adj2[u] = [];
        }
        for (const u of nodes) {
            for (const v of itemAdj[u]) {
                if (group[v] === g) {
                    adj2[u].push(v);
                    indeg2[v]++;
                }
            }
        }
        const order = kahn(nodes, adj2, indeg2);
        if (order === null) return [];
        for (const x of order) result.push(x);
    }
    return result;
};
