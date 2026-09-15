function longestCycle(edges: number[]): number {
    const n = edges.length;
    // Three colors: 0 = unvisited, 1 = on the current walk, 2 = finished.
    const color = new Array<number>(n).fill(0);
    const step = new Array<number>(n).fill(0);
    let timer = 1;
    let best = -1;
    for (let start = 0; start < n; start++) {
        if (color[start] !== 0) continue;
        let node = start;
        const path: number[] = [];
        // Out-degree <= 1 means rho shapes: walk until dead-end (-1),
        // a finished node, or a node on the current walk (a cycle).
        while (node !== -1 && color[node] === 0) {
            color[node] = 1;
            step[node] = timer;
            timer += 1;
            path.push(node);
            node = edges[node];
        }
        // Landing on color 1 means we looped back into this walk; the
        // cycle length is the steps taken since that node was stamped.
        if (node !== -1 && color[node] === 1) {
            best = Math.max(best, timer - step[node]);
        }
        // Mark the whole walk finished so later starts never re-walk it.
        for (const v of path) color[v] = 2;
    }
    return best;
}
