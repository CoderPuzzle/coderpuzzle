// Give every distinct conversion string an id and run Floyd-Warshall on the
// minimum operation cost between any two of them; repeated operations on one
// window then collapse to a shortest path.
function minimumCost(source: string, target: string, original: string[], changed: string[], cost: number[]): number {
    const ids = new Map<string, number>();
    for (const s of original) {
        if (!ids.has(s)) ids.set(s, ids.size);
    }
    for (const s of changed) {
        if (!ids.has(s)) ids.set(s, ids.size);
    }
    const m = ids.size;
    const INF = 2 ** 50;
    const dist: number[][] = Array.from({ length: m }, () => new Array(m).fill(INF));
    for (let i = 0; i < m; i++) {
        dist[i][i] = 0;
    }
    for (let i = 0; i < cost.length; i++) {
        const x = ids.get(original[i]);
        const y = ids.get(changed[i]);
        dist[x][y] = Math.min(dist[x][y], cost[i]);
    }
    for (let k = 0; k < m; k++) {
        for (let i = 0; i < m; i++) {
            if (dist[i][k] >= INF) continue;
            for (let j = 0; j < m; j++) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    // A trie over the distinct strings lets one lockstep walk over
    // source/target from each position find every usable segment length.
    // Nodes are objects keyed by char, `$` holds the string's id.
    const trie: Record<string, any> = {};
    for (const [s, x] of ids) {
        let node = trie;
        for (const ch of s) {
            if (!(ch in node)) node[ch] = {};
            node = node[ch];
        }
        node.$ = x;
    }

    const n = source.length;
    const dp: number[] = new Array(n + 1).fill(INF);
    dp[0] = 0;
    for (let j = 0; j < n; j++) {
        if (dp[j] >= INF) continue;
        if (source[j] === target[j] && dp[j] < dp[j + 1]) {
            dp[j + 1] = dp[j];
        }
        let snode = trie;
        let tnode = trie;
        for (let k = j; k < n; k++) {
            snode = snode[source[k]];
            tnode = tnode[target[k]];
            if (snode === undefined || tnode === undefined) break;
            const x = snode.$ as number | undefined;
            const y = tnode.$ as number | undefined;
            if (x !== undefined && y !== undefined) {
                const nd = dp[j] + dist[x][y];
                if (nd < dp[k + 1]) {
                    dp[k + 1] = nd;
                }
            }
        }
    }
    return dp[n] >= INF ? -1 : dp[n];
}
