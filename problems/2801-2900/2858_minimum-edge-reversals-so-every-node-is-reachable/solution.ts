function minEdgeReversals(n: number, edges: number[][]): number[] {
    const graph: [number, number][][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push([v, 0]); // traversing u -> v costs 0
        graph[v].push([u, 1]); // traversing v -> u costs 1 (reversal)
    }
    const parent: number[] = new Array(n).fill(-1);
    const order: number[] = [0];
    for (let i = 0; i < order.length; i++) {
        const x = order[i];
        for (const [y, cost] of graph[x]) {
            if (y !== parent[x]) {
                parent[y] = x;
                order.push(y);
            }
        }
    }

    const dp: number[] = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        const x = order[i];
        for (const [y, cost] of graph[x]) {
            if (parent[y] === x) dp[x] += dp[y] + cost;
        }
    }

    const ans: number[] = new Array(n).fill(0);
    ans[0] = dp[0];
    for (let i = 0; i < n; i++) {
        const x = order[i];
        for (const [y, cost] of graph[x]) {
            if (parent[y] === x) ans[y] = ans[x] + (cost === 0 ? 1 : -1);
        }
    }
    return ans;
}
