/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countRestrictedPaths = function (n, edges) {
    // Dijkstra from node n fixes dist[x] = distanceToLastNode(x); stale
    // heap entries are skipped. A restricted path strictly decreases that
    // distance at every step, so visiting nodes in increasing distance
    // order makes every count final: each strictly-closer neighbor of u
    // was visited before u. Distances stay below 2^53, so plain numbers
    // hold them exactly.
    const MOD = 1000000007;
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }
    // min-heap of [distance, node] ordered by distance, then node
    const heap = [];
    const less = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let s = i;
                if (l < heap.length && less(heap[l], heap[s])) s = l;
                if (r < heap.length && less(heap[r], heap[s])) s = r;
                if (s === i) break;
                [heap[s], heap[i]] = [heap[i], heap[s]];
                i = s;
            }
        }
        return top;
    };
    const dist = Array(n + 1).fill(Infinity);
    dist[n] = 0;
    push([0, n]);
    while (heap.length) {
        const [d, u] = pop();
        if (d > dist[u]) continue;
        for (const [v, w] of adj[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                push([d + w, v]);
            }
        }
    }
    const order = Array.from({ length: n }, (_, i) => i + 1);
    order.sort((a, b) => dist[a] - dist[b]);
    const count = Array(n + 1).fill(0);
    count[n] = 1;
    for (const u of order) {
        if (u === n) continue;
        let total = 0;
        for (const [v] of adj[u]) {
            if (dist[u] > dist[v]) total += count[v];
        }
        count[u] = total % MOD;
    }
    return count[1];
};
