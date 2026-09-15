/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} s
 * @param {number[]} marked
 * @return {number}
 */
var minimumDistance = function (n, edges, s, marked) {
    const graph = Array.from({ length: n }, () => []);
    for (const [from, to, weight] of edges) {
        graph[from].push([to, weight]); // DIRECTED: no reverse edge is added
    }

    const distances = new Array(n).fill(Infinity);
    distances[s] = 0;
    const heap = [[0, s]];
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

    // The answer is the closest marked node; unreachable ones stay at Infinity.
    let best = Infinity;
    for (const node of marked) {
        best = Math.min(best, distances[node]);
    }
    return best === Infinity ? -1 : best;
};
