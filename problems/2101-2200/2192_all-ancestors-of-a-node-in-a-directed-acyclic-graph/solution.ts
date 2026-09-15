function getAncestors(n: number, edges: number[][]): number[][] {
    // Reverse every edge; ancestors of v are exactly the nodes reachable
    // from v in the reversed graph.
    const reverseAdj: number[][] = Array.from({ length: n }, () => []);
    for (const [from, to] of edges) {
        reverseAdj[to].push(from);
    }
    const answer: number[][] = [];
    for (let start = 0; start < n; ++start) {
        const seen = new Uint8Array(n);
        seen[start] = 1;
        let queue = [start];
        while (queue.length > 0) {
            const next: number[] = [];
            for (const node of queue) {
                for (const prev of reverseAdj[node]) {
                    if (!seen[prev]) {
                        seen[prev] = 1;
                        next.push(prev);
                    }
                }
            }
            queue = next;
        }
        const row: number[] = [];
        for (let u = 0; u < n; ++u) {
            if (seen[u] && u !== start) {
                row.push(u);
            }
        }
        answer.push(row);
    }
    return answer;
}
