/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minCost = function (n, edges) {
    // Every edge (u, v, w) also contributes the single-move reversal v -> u
    // at 2 * w: standing at v, flip v's unused switch on the incoming edge
    // u -> v. Weights are positive, so an optimal trip is a simple path and
    // flips at most one switch per node anyway.
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, 2 * w]);
    }

    // Dijkstra from node 0; weights are positive, so each pop finalizes.
    const distances = new Array(n).fill(Infinity);
    distances[0] = 0;
    const heap = [[0, 0]];
    const push = (entry) => {
        heap.push(entry);
        let index = heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (heap[parent][0] <= heap[index][0]) break;
            [heap[parent], heap[index]] = [heap[index], heap[parent]];
            index = parent;
        }
    };
    const pop = () => {
        const root = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let index = 0;
            while (true) {
                let smallest = index;
                const left = index * 2 + 1;
                const right = left + 1;
                if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
                if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
                if (smallest === index) break;
                [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
                index = smallest;
            }
        }
        return root;
    };

    while (heap.length > 0) {
        const [distance, node] = pop();
        if (distance !== distances[node]) continue; // stale entry; finalized earlier
        for (const [neighbor, weight] of graph[node]) {
            const candidate = distance + weight;
            if (candidate < distances[neighbor]) {
                distances[neighbor] = candidate;
                push([candidate, neighbor]);
            }
        }
    }

    // An unreached target stays at Infinity.
    return distances[n - 1] === Infinity ? -1 : distances[n - 1];
};
