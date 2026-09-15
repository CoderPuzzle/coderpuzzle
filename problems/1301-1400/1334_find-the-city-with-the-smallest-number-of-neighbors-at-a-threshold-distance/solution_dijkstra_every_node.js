/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
    // Mirror each undirected edge both ways, so every node can run its own
    // Dijkstra over the adjacency list and pay only for real edges.
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b, w] of edges) {
        adj[a].push([b, w]);
        adj[b].push([a, w]);
    }
    const INF = Infinity;

    // Min-heap of [d, node]
    const heap = [];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let m = i;
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };

    const counts = new Array(n);
    for (let src = 0; src < n; src++) {
        // Dijkstra from src: with positive weights the smallest tentative pop
        // is already final, so every node settles exactly once.
        const dist = new Array(n).fill(INF);
        dist[src] = 0;
        push([0, src]);
        while (heap.length > 0) {
            const [d, u] = pop();
            // Stale-entry guard: skip outdated heap records.
            if (d > dist[u]) {
                continue;
            }
            for (const [v, w] of adj[u]) {
                const nd = d + w;
                // Relax only when the route strictly improves.
                if (nd < dist[v]) {
                    dist[v] = nd;
                    push([nd, v]);
                }
            }
        }
        let count = 0;
        for (let v = 0; v < n; v++) {
            if (v !== src && dist[v] <= distanceThreshold) {
                count++;
            }
        }
        counts[src] = count;
    }
    // Ascending scan with a strictly-smaller count (or equal count at a
    // larger index) implements the tie-break: greatest city number wins.
    let bestCity = -1;
    let bestCount = INF;
    for (let i = 0; i < n; i++) {
        const count = counts[i];
        if (count < bestCount || (count === bestCount && i > bestCity)) {
            bestCity = i;
            bestCount = count;
        }
    }
    return bestCity;
};
