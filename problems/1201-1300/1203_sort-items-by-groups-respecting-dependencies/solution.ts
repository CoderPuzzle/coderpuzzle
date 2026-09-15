function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
    const grp = group.slice();
    let total = m;
    for (let i = 0; i < n; i++) {
        if (grp[i] === -1) {
            grp[i] = total;
            total++;
        }
    }

    const itemAdj: number[][] = Array.from({ length: n }, () => []);
    const groupAdj: number[][] = Array.from({ length: total }, () => []);
    const groupIndeg: number[] = new Array(total).fill(0);
    for (let i = 0; i < n; i++) {
        for (const b of beforeItems[i]) {
            itemAdj[b].push(i);
            const gb = grp[b],
                gi = grp[i];
            if (gb !== gi) {
                groupAdj[gb].push(gi);
                groupIndeg[gi]++;
            }
        }
    }

    // LIFO Kahn: stack initialized in descending id order so the smallest
    // zero-indegree id pops first; newly available nodes are pushed on top.
    const kahn = function (keys: number[], adj: number[][], indeg: number[]): number[] | null {
        const ind = indeg.slice();
        const available: number[] = [];
        for (const k of keys) {
            if (ind[k] === 0) available.push(k);
        }
        available.sort((a, b) => b - a);
        const order: number[] = [];
        while (available.length > 0) {
            const u = available.pop()!;
            order.push(u);
            for (const v of adj[u]) {
                if (--ind[v] === 0) available.push(v);
            }
        }
        return order.length === keys.length ? order : null;
    };

    const keys: number[] = [];
    for (let g = 0; g < total; g++) keys.push(g);
    const groupOrder = kahn(keys, groupAdj, groupIndeg);
    if (groupOrder === null) return [];

    const itemsInGroup: number[][] = Array.from({ length: total }, () => []);
    for (let i = 0; i < n; i++) itemsInGroup[grp[i]].push(i);

    const result: number[] = [];
    const indeg2: number[] = new Array(n).fill(0);
    const adj2: number[][] = Array.from({ length: n }, () => []);
    for (const g of groupOrder) {
        const nodes = itemsInGroup[g];
        if (nodes.length === 0) continue;
        for (const u of nodes) {
            indeg2[u] = 0;
            adj2[u] = [];
        }
        for (const u of nodes) {
            for (const v of itemAdj[u]) {
                if (grp[v] === g) {
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
}
