/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minCostExcludingMax = function (n, edges) {
    // Excluding the first maximum-weight edge of a path equals excluding
    // any one designated edge (both give sum - maxweight), so Dijkstra
    // runs over states (node, excluded): staying in a layer pays the edge
    // weight, crossing layers excludes exactly one edge for free. A path
    // cost is at most (n - 1) * 5 * 10^4 ~ 2.5 * 10^9, far below 2^53, so
    // Number arithmetic is exact.
    const adjacency = Array.from({ length: n }, () => []);
    for (const [a, b, w] of edges) {
        adjacency[a].push([b, w]);
        adjacency[b].push([a, w]);
    }
    const best = Array.from({ length: n }, () => [Infinity, Infinity]);
    best[0][0] = 0;

    // Binary min-heap of [distance, node, excluded] entries, smallest
    // distance at the root; a plain array with manual sift is enough at
    // this scale and avoids pulling in an external heap implementation.
    const heap = [[0, 0, 0]];
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
        const [dist, node, used] = pop();
        if (dist > best[node][used]) continue;
        if (node === n - 1 && used === 1) return dist;
        for (const [neighbor, weight] of adjacency[node]) {
            if (dist + weight < best[neighbor][used]) {
                best[neighbor][used] = dist + weight;
                push([dist + weight, neighbor, used]);
            }
            if (used === 0 && dist < best[neighbor][1]) {
                best[neighbor][1] = dist;
                push([dist, neighbor, 1]);
            }
        }
    }
    throw new Error("unreachable: the graph is connected");
};
