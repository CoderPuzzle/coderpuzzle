/**
 * @param {number[][]} edges
 * @param {number} maxMoves
 * @param {number} n
 * @return {number}
 */
var reachableNodes = function (edges, maxMoves, n) {
    const adj = Array.from({ length: n }, () => []);
    // Subdividing [u, v, cnt] yields cnt + 1 unit edges, so Dijkstra on
    // the compact graph with weight cnt + 1 gives the true distances.
    for (const [u, v, cnt] of edges) {
        adj[u].push([v, cnt + 1]);
        adj[v].push([u, cnt + 1]);
    }
    const INF = Infinity;
    const dist = new Array(n).fill(INF);
    dist[0] = 0;
    // min-heap of [d, u]
    const heap = [];
    const hpush = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const hpop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                let smallest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < heap.length && heap[l][0] < heap[smallest][0]) smallest = l;
                if (r < heap.length && heap[r][0] < heap[smallest][0]) smallest = r;
                if (smallest === i) break;
                [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
                i = smallest;
            }
        }
        return top;
    };
    hpush([0, 0]);
    while (heap.length > 0) {
        const [d, u] = hpop();
        // Lazy deletion: a stale heap entry no longer matches dist[u].
        if (d !== dist[u]) continue;
        for (const [v, w] of adj[u]) {
            const nd = d + w;
            if (nd < dist[v]) {
                dist[v] = nd;
                hpush([nd, v]);
            }
        }
    }
    let result = 0;
    // Half one: original nodes within the budget.
    for (const d of dist) {
        if (d <= maxMoves) {
            result += 1;
        }
    }
    // Half two: each edge contributes the frontiers walked in from both
    // ends; min(cnt, a + b) clamps the overlap where they meet.
    for (const [u, v, cnt] of edges) {
        const a = Math.max(0, maxMoves - dist[u]);
        const b = Math.max(0, maxMoves - dist[v]);
        result += Math.min(cnt, a + b);
    }
    return result;
};
