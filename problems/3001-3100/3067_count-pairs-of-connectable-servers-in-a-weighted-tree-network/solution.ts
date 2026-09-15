function countPairsOfConnectableServers(edges: number[][], signalSpeed: number): number[] {
    const n = edges.length + 1;
    const adj: number[][][] = Array.from({ length: n }, () => []);
    for (const [a, b, w] of edges) {
        adj[a].push([b, w]);
        adj[b].push([a, w]);
    }

    const answer: number[] = new Array(n).fill(0);

    // For each server c, flood every branch (one component per neighbor)
    // separately, counting the servers whose distance from c is divisible
    // by signalSpeed. Two paths out of c share an edge exactly when they
    // leave along the same first edge, so cross-branch pairs are exactly
    // the connectable ones; c itself sits in no branch. A parent guard
    // prevents revisits -- sufficient in a tree -- and the explicit stack
    // keeps the walk off the call stack.
    for (let c = 0; c < n; c++) {
        let total = 0;
        let squareSum = 0;
        for (const [rootV, rootW] of adj[c]) {
            let count = 0;
            const stack: number[][] = [[rootV, c, rootW % signalSpeed]];
            while (stack.length > 0) {
                const [u, parent, dist] = stack.pop()!;
                if (dist === 0) count++;
                for (const [v, w] of adj[u]) {
                    if (v !== parent) stack.push([v, u, (dist + w) % signalSpeed]);
                }
            }
            total += count;
            squareSum += count * count;
        }
        // Cross-branch pairs: sum of cnt_i * cnt_j over i < j.
        answer[c] = (total * total - squareSum) / 2;
    }
    return answer;
}
