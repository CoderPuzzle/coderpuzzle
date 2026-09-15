function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
    // Kahn's algorithm over the condition graph. Duplicate conditions only
    // add parallel edges and matching indegrees — harmless.
    const topo = (conditions: number[][]): number[] | null => {
        const adj: number[][] = Array.from({ length: k + 1 }, () => []);
        const indeg: number[] = new Array(k + 1).fill(0);
        for (const [a, b] of conditions) {
            adj[a].push(b);
            indeg[b] += 1;
        }
        const queue: number[] = [];
        for (let v = 1; v <= k; v++) {
            if (indeg[v] === 0) queue.push(v);
        }
        const order: number[] = [];
        let head = 0;
        while (head < queue.length) {
            const u = queue[head++];
            order.push(u);
            for (const w of adj[u]) {
                indeg[w] -= 1;
                if (indeg[w] === 0) queue.push(w);
            }
        }
        // Fewer than k vertices peeled means a cycle: no valid order.
        if (order.length !== k) return null;
        return order;
    };

    const rowOrder = topo(rowConditions);
    if (rowOrder === null) return [];
    const colOrder = topo(colConditions);
    if (colOrder === null) return [];
    // The two orders are independent; distinct vertices of a topo order
    // get distinct positions, so every required pair stays strictly
    // ordered when v is placed at (rowPos[v], colPos[v]).
    const rowPos: number[] = new Array(k + 1);
    const colPos: number[] = new Array(k + 1);
    rowOrder.forEach((v, i) => {
        rowPos[v] = i;
    });
    colOrder.forEach((v, i) => {
        colPos[v] = i;
    });
    const matrix: number[][] = Array.from({ length: k }, () => new Array(k).fill(0));
    for (let v = 1; v <= k; v++) {
        matrix[rowPos[v]][colPos[v]] = v;
    }
    return matrix;
}
