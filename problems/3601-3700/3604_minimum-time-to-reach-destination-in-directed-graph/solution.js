/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minTime = function (n, edges) {
    // Earliest-arrival Dijkstra: dist[u] is the soonest time you can be
    // standing on u. Waiting is always allowed, so an edge leaving u at
    // time t departs at max(t, start). Times stay below 2^53, so plain
    // numbers hold them exactly.
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, start, end] of edges) {
        adj[u].push([v, start, end]);
    }
    // min-heap of [time, node] ordered by time, then node
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
    const dist = Array(n).fill(Infinity);
    dist[0] = 0;
    push([0, 0]);
    while (heap.length) {
        const [t, u] = pop();
        if (t > dist[u]) continue;
        for (const [v, start, end] of adj[u]) {
            const depart = Math.max(t, start);
            if (depart <= end) {
                const arrive = depart + 1;
                if (arrive < dist[v]) {
                    dist[v] = arrive;
                    push([arrive, v]);
                }
            }
        }
    }
    return dist[n - 1] === Infinity ? -1 : dist[n - 1];
};
