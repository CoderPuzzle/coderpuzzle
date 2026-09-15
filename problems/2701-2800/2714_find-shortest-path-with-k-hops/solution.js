/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} s
 * @param {number} d
 * @param {number} k
 * @return {number}
 */
var shortestPathWithHops = function (n, edges, s, d, k) {
    // Dijkstra over states (node, hops used): staying in a layer pays the
    // edge weight, a hop crosses into the next layer for free; node d pops
    // at the minimum over every way of spending at most k free edges.
    const adjacency = Array.from({ length: n }, () => []);
    for (const [a, b, w] of edges) {
        adjacency[a].push([b, w]);
        adjacency[b].push([a, w]);
    }
    const best = Array.from({ length: n }, () => new Array(k + 1).fill(Infinity));
    best[s][0] = 0;

    // Binary min-heap of [distance, node, hops] entries, smallest distance
    // at the root; a plain array with manual sift is enough at this scale
    // and avoids pulling in an external heap implementation.
    const heap = [[0, s, 0]];
    const swap = (i, j) => {
        const tmp = heap[i];
        heap[i] = heap[j];
        heap[j] = tmp;
    };
    const siftUp = (i) => {
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (heap[parent][0] <= heap[i][0]) break;
            swap(parent, i);
            i = parent;
        }
    };
    const siftDown = (i) => {
        const size = heap.length;
        for (;;) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < size && heap[left][0] < heap[smallest][0]) smallest = left;
            if (right < size && heap[right][0] < heap[smallest][0]) smallest = right;
            if (smallest === i) break;
            swap(i, smallest);
            i = smallest;
        }
    };
    const push = (entry) => {
        heap.push(entry);
        siftUp(heap.length - 1);
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            siftDown(0);
        }
        return top;
    };

    while (heap.length > 0) {
        const [dist, node, hops] = pop();
        if (dist > best[node][hops]) continue;
        if (node === d) return dist;
        for (const [neighbor, weight] of adjacency[node]) {
            const candidate = dist + weight;
            if (candidate < best[neighbor][hops]) {
                best[neighbor][hops] = candidate;
                push([candidate, neighbor, hops]);
            }
            if (hops < k && dist < best[neighbor][hops + 1]) {
                best[neighbor][hops + 1] = dist;
                push([dist, neighbor, hops + 1]);
            }
        }
    }
    throw new Error("unreachable: the graph is connected");
};
