function maxTargetNodes(edges1: number[][], edges2: number[][], k: number): number[] {
    // answer[i] = (nodes within k of i in tree 1) + max over v of (nodes
    // within k - 1 of v in tree 2): the connecting edge spends one of the
    // k steps, and queries are independent (hints 1-2). With k = 0 the
    // k - 1 limit floors to zero second-tree nodes. Layer BFS is iterative
    // — a 1000-node path would overflow the judged JS stack.
    const build = (edges: number[][]): number[][] => {
        const adj: number[][] = Array.from({ length: edges.length + 1 }, () => []);
        for (const [a, b] of edges) {
            adj[a].push(b);
            adj[b].push(a);
        }
        return adj;
    };
    const within = (adj: number[][], start: number, limit: number): number => {
        if (limit < 0) return 0;
        const seen = new Array<boolean>(adj.length).fill(false);
        seen[start] = true;
        let count = 1;
        let frontier = [start];
        for (let depth = 0; depth < limit && frontier.length > 0; depth++) {
            const next: number[] = [];
            for (const u of frontier) {
                for (const w of adj[u]) {
                    if (!seen[w]) {
                        seen[w] = true;
                        count++;
                        next.push(w);
                    }
                }
            }
            frontier = next;
        }
        return count;
    };
    const adj1 = build(edges1);
    const adj2 = build(edges2);
    let best2 = 0;
    for (let v = 0; v < adj2.length; v++) {
        best2 = Math.max(best2, within(adj2, v, k - 1));
    }
    const answer: number[] = [];
    for (let u = 0; u < adj1.length; u++) {
        answer.push(within(adj1, u, k) + best2);
    }
    return answer;
}
