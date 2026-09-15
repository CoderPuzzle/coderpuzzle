/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
    const graph = new Map(); // node -> [[v, w], ...]
    for (const [u, v, w] of times) {
        if (!graph.has(u)) graph.set(u, []);
        graph.get(u).push([v, w]);
    }

    // min-heap of [dist, node]
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
                const l = 2 * i + 1,
                    r = 2 * i + 2;
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

    const dist = new Map();
    push([0, k]);
    while (heap.length > 0) {
        const [d, u] = pop();
        // Lazy stale-entry handling: skip nodes settled by an earlier pop.
        if (dist.has(u)) continue;
        // Non-negative weights make the first pop the true shortest distance,
        // so u is final now and never revisited.
        dist.set(u, d);
        const edges = graph.get(u);
        if (edges) {
            for (const [v, w] of edges) {
                if (!dist.has(v)) push([d + w, v]);
            }
        }
    }

    // Fewer than n settled nodes means something is unreachable from k.
    if (dist.size !== n) return -1;
    // The last node to hear the signal sets the answer.
    let best = 0;
    for (const d of dist.values()) {
        if (d > best) best = d;
    }
    return best;
};
