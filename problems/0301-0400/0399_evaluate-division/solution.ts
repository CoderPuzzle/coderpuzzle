function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    // node -> Map(neighbor -> weight); Map preserves insertion order and
    // updating an existing key keeps its original position (like Python dict).
    const graph = new Map<string, Map<string, number>>();
    const addEdge = (a: string, b: string, w: number): void => {
        let adj = graph.get(a);
        if (!adj) {
            adj = new Map<string, number>();
            graph.set(a, adj);
        }
        adj.set(b, w);
    };
    // Each equation a/b = v becomes a directed edge a -> b of weight v
    // plus the reverse edge of weight 1/v (division inverts with direction).
    for (let i = 0; i < equations.length; i++) {
        const a = equations[i][0],
            b = equations[i][1];
        const value = values[i];
        addEdge(a, b, value);
        addEdge(b, a, 1.0 / value);
    }

    const query = (start: string, end: string): number => {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if (!graph.has(start) || !graph.has(end)) return -1.0;
        if (start === end) return 1.0;
        // BFS carrying the running product: weights along the path telescope
        // to start / end because intermediate variables cancel.
        const seen = new Set<string>([start]);
        const queue: [string, number][] = [[start, 1.0]];
        let head = 0;
        while (head < queue.length) {
            const [node, product] = queue[head++];
            for (const [neighbor, weight] of graph.get(node) as Map<string, number>) {
                if (neighbor === end) {
                    // Equations are consistent, so the first path found
                    // already yields the correct quotient.
                    return product * weight;
                }
                if (!seen.has(neighbor)) {
                    seen.add(neighbor);
                    queue.push([neighbor, product * weight]);
                }
            }
        }
        return -1.0;
    };

    return queries.map(([c, d]) => query(c, d));
}
