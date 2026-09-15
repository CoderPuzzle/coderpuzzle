function maxLen(n: number, edges: number[][], label: string): number {
    const adj: number[][] = [];
    for (let i = 0; i < n; i++) adj.push([]);
    for (const e of edges) {
        adj[e[0]].push(e[1]);
        adj[e[1]].push(e[0]);
    }
    const codes: number[] = [];
    for (let i = 0; i < n; i++) codes.push(label.charCodeAt(i));
    const memo = new Int8Array((1 << n) * n * n).fill(-1);

    function popcount(x: number): number {
        let cnt = 0;
        while (x !== 0) {
            x &= x - 1;
            cnt++;
        }
        return cnt;
    }

    // dp(mask, left, right): best length reachable when mask is the visited set
    // and left/right are the path endpoints. Invariant: the visited nodes spell
    // a palindrome read from left to right.
    function dp(mask: number, left: number, right: number): number {
        const idx = (mask * n + left) * n + right;
        if (memo[idx] >= 0) return memo[idx];
        // The standing path already spells a palindrome, so its length is the
        // floor every extension must beat.
        let best = popcount(mask);
        // Grow outward by one matched pair: u glues onto the left end, v onto
        // the right end; they must be distinct, unvisited, and equally labeled
        // so the path stays palindromic.
        for (const u of adj[left]) {
            if (((mask >> u) & 1) !== 0) continue;
            for (const v of adj[right]) {
                if (u === v || ((mask >> v) & 1) !== 0) continue;
                if (codes[u] !== codes[v]) continue;
                const cand = dp(mask | (1 << u) | (1 << v), u, v);
                if (cand > best) best = cand;
            }
        }
        memo[idx] = best;
        return best;
    }

    // Every palindrome has a center: seed odd paths from each single node
    // and even paths from each equal-label adjacent pair.
    let answer = 1;
    for (let i = 0; i < n; i++) {
        const len = dp(1 << i, i, i);
        if (len > answer) answer = len;
    }
    for (const e of edges) {
        const u = e[0],
            v = e[1];
        if (codes[u] === codes[v]) {
            const len = dp((1 << u) | (1 << v), u, v);
            if (len > answer) answer = len;
        }
    }
    return answer;
}
