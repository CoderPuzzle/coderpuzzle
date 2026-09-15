function findMaxPathScore(edges: number[][], online: boolean[], k: number): number {
    const n = online.length;
    const adj: [number, number][][] = Array.from({ length: n }, () => []);
    const indeg = new Array(n).fill(0);
    for (const [u, v, c] of edges) {
        adj[u].push([v, c]);
        indeg[v] += 1;
    }

    // Kahn's algorithm: the topological order is computed once and reused
    // by every feasibility check below (the graph is a DAG).
    const queue: number[] = [];
    for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);
    const topo: number[] = [];
    let head = 0;
    while (head < queue.length) {
        const u = queue[head++];
        topo.push(u);
        for (const [v] of adj[u]) {
            indeg[v] -= 1;
            if (indeg[v] === 0) queue.push(v);
        }
    }

    // Feasibility is monotone in the threshold (lowering it only adds
    // edges), so binary-search the sorted distinct edge costs for the
    // largest feasible score.
    const costSet = new Set(edges.map((e) => e[2]));
    const costs = Array.from(costSet).sort((a, b) => a - b);

    // feasible(s): a path from 0 to n-1 within budget k exists using only
    // edges of cost >= s and only online nodes. The cheapest such path is
    // the right witness, so distances are minimized in topological order.
    const feasible = (s: number): boolean => {
        const INF = Infinity;
        const dist = new Array(n).fill(INF);
        dist[0] = 0;
        for (const u of topo) {
            if (dist[u] === INF || !online[u]) continue;
            for (const [v, c] of adj[u]) {
                if (c >= s && online[v]) {
                    const nd = dist[u] + c;
                    if (nd < dist[v]) dist[v] = nd;
                }
            }
        }
        return dist[n - 1] <= k;
    };

    // If even with every edge allowed no budget-feasible path exists, no
    // score is achievable.
    if (!feasible(0)) return -1;
    if (costs.length === 0) return 0;
    let lo = 0,
        hi = costs.length - 1;
    let ans = costs[0];
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(costs[mid])) {
            ans = costs[mid];
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}
