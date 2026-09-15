function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Iterative DFS from node 0: parents and a top-down visit order.
    const parent: number[] = new Array(n).fill(-1);
    const order: number[] = [0];
    const seen: boolean[] = new Array(n).fill(false);
    seen[0] = true;
    let head = 0;
    while (head < order.length) {
        const u = order[head++];
        for (const v of adj[u]) {
            if (!seen[v]) {
                seen[v] = true;
                parent[v] = u;
                order.push(v);
            }
        }
    }

    const sub: number[] = new Array(n).fill(1);
    const dist: number[] = new Array(n).fill(0);
    // Bottom-up pass: dist[u] = sum over children of (dist[v] + sub[v]).
    for (let i = order.length - 1; i >= 0; i--) {
        const u = order[i];
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            sub[u] += sub[v];
            dist[u] += dist[v] + sub[v];
        }
    }

    const ans: number[] = new Array(n).fill(0);
    ans[0] = dist[0];
    // Top-down re-rooting pass.
    for (const u of order) {
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            ans[v] = ans[u] - sub[v] + (n - sub[v]);
        }
    }
    return ans;
}
