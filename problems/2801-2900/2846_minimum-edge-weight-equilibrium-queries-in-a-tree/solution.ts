function minOperationsQueries(n: number, edges: number[][], queries: number[][]): number[] {
    // Adjacency as flat per-node arrays of (node, weight) pairs.
    const adjacency: number[][][] = new Array(n);
    for (let node = 0; node < n; ++node) adjacency[node] = [];
    for (const [u, v, w] of edges) {
        adjacency[u].push([v, w - 1]);
        adjacency[v].push([u, w - 1]);
    }

    // One breadth-first search from node 0 fills every static structure:
    // parent/depth and a parent-before-child order that both the weight
    // frequency prefixes and the lifting table consume in one sweep. The
    // queue keeps a 10^4-node path off the call stack.
    const parent = new Int32Array(n);
    const pweight = new Int32Array(n);
    const depth = new Int32Array(n);
    const seen = new Uint8Array(n);
    const order = new Int32Array(n);
    let count = 1;
    seen[0] = 1;
    for (let head = 0; head < count; ++head) {
        const node = order[head];
        for (const [next, weight] of adjacency[node]) {
            if (!seen[next]) {
                seen[next] = 1;
                parent[next] = node;
                pweight[next] = weight;
                depth[next] = depth[node] + 1;
                order[count++] = next;
            }
        }
    }

    // Changing an edge to any value leaves other edges untouched, so an
    // operation fixes exactly one edge of the path and the answer is the
    // path length minus its most frequent edge weight. Weights live in
    // 1..26, so freq[w * n + v] counts weight-(w + 1) edges from the root
    // down to v; on the a..b path that count is freq[a] + freq[b] - 2 *
    // freq[lca]: every edge above the lowest common ancestor appears in
    // both root paths and cancels, and the LCA's own incoming edge cancels
    // with itself.
    const freq = new Int32Array(26 * n);
    for (let index = 1; index < n && index < count; ++index) {
        const node = order[index];
        const up = parent[node];
        for (let w = 0; w < 26; ++w) freq[w * n + node] = freq[w * n + up];
        freq[pweight[node] * n + node]++;
    }

    // Binary lifting over the parent pointers: table[level * n + v] is the
    // 2^level-th ancestor of v (the root maps to itself), which makes each
    // query an O(log n) climb instead of a walk along the possibly O(n)
    // path. Every stored value stays below 2^17 << 2^31.
    let maxDepth = 0;
    for (let node = 0; node < n; ++node) if (depth[node] > maxDepth) maxDepth = depth[node];
    let levels = 1;
    while (1 << levels <= maxDepth) ++levels;
    const table = new Int32Array(levels * n);
    for (let node = 0; node < n; ++node) table[node] = parent[node];
    for (let level = 1; level < levels; ++level) {
        const shift = level * n;
        const half = (level - 1) * n;
        for (let node = 0; node < n; ++node) {
            table[shift + node] = table[half + table[half + node]];
        }
    }

    const answer: number[] = [];
    for (const [a, b] of queries) {
        let u = a;
        let v = b;
        if (depth[u] < depth[v]) {
            u = b;
            v = a;
        }
        let diff = depth[u] - depth[v];
        let level = 0;
        while (diff > 0) {
            if (diff & 1) u = table[level * n + u];
            diff >>= 1;
            ++level;
        }
        let lca;
        if (u !== v) {
            for (level = levels - 1; level >= 0; --level) {
                const base = level * n;
                if (table[base + u] !== table[base + v]) {
                    u = table[base + u];
                    v = table[base + v];
                }
            }
            lca = parent[u];
        } else {
            lca = u;
        }
        let best = -1;
        for (let w = 0; w < 26; ++w) {
            const cnt = freq[w * n + a] + freq[w * n + b] - 2 * freq[w * n + lca];
            if (cnt > best) best = cnt;
        }
        answer.push(depth[a] + depth[b] - 2 * depth[lca] - best);
    }
    return answer;
}
