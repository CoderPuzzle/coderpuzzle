/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} price
 * @param {number[][]} trips
 * @return {number}
 */
var minimumTotalPrice = function (n, edges, price, trips) {
    const adj = Array.from({ length: n }, () => []);
    for (const e of edges) {
        adj[e[0]].push(e[1]);
        adj[e[1]].push(e[0]);
    }

    const freq = new Array(n).fill(0);
    for (const trip of trips) {
        const start = trip[0],
            end = trip[1];
        const parent = new Array(n).fill(-1);
        const visited = new Array(n).fill(false);
        const stack = [start];
        visited[start] = true;
        while (stack.length > 0) {
            const v = stack.pop();
            if (v === end) break;
            for (const u of adj[v]) {
                if (!visited[u]) {
                    visited[u] = true;
                    parent[u] = v;
                    stack.push(u);
                }
            }
        }
        let cur = end;
        while (cur !== -1) {
            freq[cur] += 1;
            if (cur === start) break;
            cur = parent[cur];
        }
    }

    const dfs = (v, p) => {
        let dp0 = price[v] * freq[v];
        let dp1 = Math.floor(price[v] / 2) * freq[v];
        for (const u of adj[v]) {
            if (u === p) continue;
            const c = dfs(u, v);
            dp0 += Math.min(c[0], c[1]);
            dp1 += c[0];
        }
        return [dp0, dp1];
    };

    const res = dfs(0, -1);
    return Math.min(res[0], res[1]);
};
