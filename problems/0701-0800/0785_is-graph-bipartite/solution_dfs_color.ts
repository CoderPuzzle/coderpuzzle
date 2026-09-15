function isBipartite(graph: number[][]): boolean {
    const n = graph.length;
    // 0 = uncolored, else +1/-1: bipartite iff a proper 2-coloring
    // exists, with each node forced to the opposite of the color it
    // is reached from.
    const color: number[] = new Array(n).fill(0);
    // The graph may be disconnected: start a fresh DFS from every
    // still-uncolored node.
    for (let start = 0; start < n; start++) {
        if (color[start] !== 0) continue;
        color[start] = 1;
        // Mark-on-push stack discipline: a node is colored when it
        // enters the stack, so it can never be pushed twice.
        const stack: number[] = [start];
        while (stack.length > 0) {
            const u = stack.pop()!;
            for (const v of graph[u]) {
                // Uncolored neighbor: take the opposite color.
                if (color[v] === 0) {
                    color[v] = -color[u];
                    stack.push(v);
                } else if (color[v] === color[u]) {
                    // Same-color edge = odd cycle, the sole
                    // obstruction to bipartiteness.
                    return false;
                }
            }
        }
    }
    // Every component colored cleanly: the two color classes are
    // the required partition.
    return true;
}
