function modifiedGraphEdges(
    n: number,
    edges: number[][],
    source: number,
    destination: number,
    target: number,
): number[][] {
    const INFINITY = Number.MAX_SAFE_INTEGER;
    const count = edges.length;

    // Weights <= 0 are skipped, so passing the raw list treats every -1 edge
    // as absent, while passing the working copy gives the current assignment.
    const dijkstra = (weights: number[], start: number): number[] => {
        const adjacency: number[][][] = Array.from({ length: n }, () => []);
        for (let index = 0; index < count; index++) {
            if (weights[index] <= 0) continue;
            adjacency[edges[index][0]].push([edges[index][1], weights[index]]);
            adjacency[edges[index][1]].push([edges[index][0], weights[index]]);
        }

        // Min-heap of [distance, node] pairs: a plain array with manual sift
        // is enough at this scale and avoids an external heap dependency.
        const heap: number[][] = [];
        const swap = (i: number, j: number): void => {
            const temporary = heap[i];
            heap[i] = heap[j];
            heap[j] = temporary;
        };
        const siftUp = (i: number): void => {
            while (i > 0) {
                const parent = (i - 1) >> 1;
                if (heap[parent][0] <= heap[i][0]) break;
                swap(parent, i);
                i = parent;
            }
        };
        const siftDown = (): void => {
            const size = heap.length;
            let i = 0;
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
        const push = (entry: number[]): void => {
            heap.push(entry);
            siftUp(heap.length - 1);
        };
        const pop = (): number[] => {
            const top = heap[0];
            const last = heap.pop();
            if (heap.length > 0) {
                heap[0] = last;
                siftDown();
            }
            return top;
        };

        const distance: number[] = new Array(n).fill(INFINITY);
        distance[start] = 0;
        push([0, start]);
        while (heap.length > 0) {
            const [dist, node] = pop();
            if (dist > distance[node]) continue;
            for (const [neighbor, weight] of adjacency[node]) {
                const candidate = dist + weight;
                if (candidate < distance[neighbor]) {
                    distance[neighbor] = candidate;
                    push([candidate, neighbor]);
                }
            }
        }
        return distance;
    };

    const untouched: number[] = edges.map((edge) => edge[2]);
    if (dijkstra(untouched, source)[destination] < target) return [];

    const weights: number[] = untouched.map((weight) => (weight > 0 ? weight : 1));
    if (dijkstra(weights, source)[destination] > target) return [];

    for (;;) {
        const distances = dijkstra(weights, source);
        const current = distances[destination];
        if (current === target) break;

        const reverse = dijkstra(weights, destination);
        const deficit = target - current;
        let bestIndex = -1;
        let bestKey = Infinity;
        for (let index = 0; index < count; index++) {
            if (untouched[index] !== -1) continue;
            const [u, v] = edges[index];
            const forward = distances[u] + weights[index] + reverse[v] === current;
            const backward = distances[v] + weights[index] + reverse[u] === current;
            if (!forward && !backward) continue;
            let key = distances[u];
            if (backward && (!forward || distances[v] < key)) key = distances[v];
            if (key < bestKey) {
                bestKey = key;
                bestIndex = index;
            }
        }
        weights[bestIndex] += deficit;
    }

    return edges.map((edge, index) => [edge[0], edge[1], weights[index]]);
}
