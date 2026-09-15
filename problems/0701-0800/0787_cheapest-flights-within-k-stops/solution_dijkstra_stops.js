/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
    const graph = Array.from({ length: n }, () => []);
    for (const [f, t, price] of flights) {
        graph[f].push([t, price]);
    }

    // Min-heap of [cost, node, flights taken]
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

    // State = (cost, node, flights taken). Carrying the count in the state
    // is what enforces the limit: a state that already used its k+1 flights
    // is never allowed to board another.
    push([0, src, 0]);
    const best = new Array(n).fill(Infinity);
    while (heap.length > 0) {
        const [cost, node, edges] = pop();
        // The heap pops in cost order, so the first dst pop is final.
        if (node === dst) {
            return cost;
        }
        // Dominance prune: a cheaper state that used no more flights was
        // already expanded here, so this one cannot lead anywhere new.
        if (edges > best[node]) {
            continue;
        }
        best[node] = edges;
        if (edges < k + 1) {
            for (const [nxt, price] of graph[node]) {
                push([cost + price, nxt, edges + 1]);
            }
        }
    }
    return -1;
};
