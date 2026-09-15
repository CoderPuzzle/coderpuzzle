function validTree(n: number, edges: number[][]): boolean {
    // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
    // more cannot stay acyclic — any other count fails immediately.
    if (edges.length !== n - 1) {
        return false;
    }
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }
    // With n - 1 edges on the table, connectivity is the only open
    // question: connected + n - 1 edges forces the graph to be a tree.
    const seen: boolean[] = new Array(n).fill(false);
    const queue: number[] = [0];
    seen[0] = true;
    let visited = 1;
    for (let head = 0; head < queue.length; head++) {
        const u = queue[head];
        for (const v of adjacency[u]) {
            if (!seen[v]) {
                seen[v] = true;
                visited++;
                queue.push(v);
            }
        }
    }
    return visited === n;
}
