// Per subtree keep the three largest and the two smallest cost values: the
// maximum product of three distinct nodes is either the three largest or the
// two smallest times the largest. Subtrees can be one long chain (n up to
// 2 * 10**4), so the traversal collects parents by BFS and merges children in
// reverse BFS order.
function placedCoins(edges: number[][], cost: number[]): number[] {
    const n = cost.length;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const parent: number[] = new Array(n).fill(-1);
    const order: number[] = [0];
    for (let head = 0; head < order.length; head++) {
        const u = order[head];
        for (const v of adj[u]) {
            if (v !== parent[u]) {
                parent[v] = u;
                order.push(v);
            }
        }
    }

    const ans: number[] = new Array(n).fill(0);
    const size: number[] = new Array(n).fill(1);
    const top: number[][] = Array.from({ length: n }, (_, i) => [cost[i]]); // up to 3 largest, descending
    const bot: number[][] = Array.from({ length: n }, (_, i) => [cost[i]]); // up to 2 smallest, ascending
    for (let k = n - 1; k >= 0; k--) {
        const u = order[k];
        if (size[u] < 3) {
            ans[u] = 1;
        } else {
            const t = top[u];
            const b = bot[u];
            const best = Math.max(t[0] * t[1] * t[2], b[0] * b[1] * t[0]);
            ans[u] = best > 0 ? best : 0;
        }
        const p = parent[u];
        if (p >= 0) {
            size[p] += size[u];
            top[p] = top[p]
                .concat(top[u])
                .sort((x, y) => y - x)
                .slice(0, 3);
            bot[p] = bot[p]
                .concat(bot[u])
                .sort((x, y) => x - y)
                .slice(0, 2);
        }
    }
    return ans;
}
