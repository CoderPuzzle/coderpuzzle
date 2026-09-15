/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function (n, connections) {
    // adjacency over n + 1 slots (index 0 unused; nodes are 1-based);
    // each link is filed once per direction
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [x, y, cost] of connections) {
        adj[x].push([cost, y]);
        adj[y].push([cost, x]);
    }

    // Min-heap of [cost, node]
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

    const visited = new Array(n + 1).fill(false);
    let total = 0;
    let settled = 0;
    // Prim: grow one tree outward from node 1; the cheapest offer
    // leaving the tree is always safe to buy
    push([0, 1]);
    while (heap.length > 0 && settled < n) {
        const [cost, v] = pop();
        // stale-entry guard: v already joined via an offer at most this cheap
        if (visited[v]) {
            continue;
        }
        visited[v] = true;
        total += cost;
        settled++;
        for (const [w, u] of adj[v]) {
            if (!visited[u]) {
                push([w, u]);
            }
        }
    }
    // queue drained before every node joined: the catalogue cannot
    // connect all n nodes
    return settled === n ? total : -1;
};
