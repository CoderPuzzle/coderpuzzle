function possibleBipartition(n: number, dislikes: number[][]): boolean {
    // Dislike is symmetric, so build an undirected adjacency list: a
    // valid two-group split is exactly a 2-coloring of this graph.
    const adjacency: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [a, b] of dislikes) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }

    const color: number[] = new Array(n + 1).fill(0); // 0 = uncolored, 1 / -1 = the two groups
    // The dislike graph may be disconnected, so the scan restarts the
    // DFS from every still-uncolored person; each run colors one
    // whole connected component.
    for (let start = 1; start <= n; start++) {
        if (color[start] !== 0) {
            continue;
        }
        color[start] = 1;
        // The stack drives a depth-first sweep: pop a person, then
        // push every uncolored neighbor with the opposite color
        // (marking on push); a neighbor already sharing the current
        // color closes an odd cycle, so no split exists.
        const stack: number[] = [start];
        while (stack.length > 0) {
            const person = stack.pop()!;
            for (const neighbor of adjacency[person]) {
                if (color[neighbor] === 0) {
                    color[neighbor] = -color[person];
                    stack.push(neighbor);
                } else if (color[neighbor] === color[person]) {
                    return false;
                }
            }
        }
    }
    return true;
}
