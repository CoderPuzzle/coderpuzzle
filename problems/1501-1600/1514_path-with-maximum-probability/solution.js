/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start_node, end_node) {
    const adjacency = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; ++i) {
        const [a, b] = edges[i];
        const probability = succProb[i];
        adjacency[a].push([b, probability]);
        adjacency[b].push([a, probability]);
    }

    const best = new Array(n).fill(0);
    best[start_node] = 1;
    const visited = new Array(n).fill(false);

    // Binary max-heap of [probability, node] pairs, highest probability
    // at the root; a plain array with manual sift is enough at this scale
    // and avoids pulling in an external heap implementation.
    const heap = [[1, start_node]];
    const swap = (i, j) => {
        const tmp = heap[i];
        heap[i] = heap[j];
        heap[j] = tmp;
    };
    const siftUp = (i) => {
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (heap[parent][0] >= heap[i][0]) break;
            swap(parent, i);
            i = parent;
        }
    };
    const siftDown = (i) => {
        const size = heap.length;
        for (;;) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < size && heap[left][0] > heap[largest][0]) largest = left;
            if (right < size && heap[right][0] > heap[largest][0]) largest = right;
            if (largest === i) break;
            swap(i, largest);
            i = largest;
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
        const [probability, node] = pop();
        if (visited[node]) continue;
        visited[node] = true;
        if (node === end_node) return probability;
        for (const [neighbor, edgeProbability] of adjacency[node]) {
            const candidate = probability * edgeProbability;
            if (candidate > best[neighbor]) {
                best[neighbor] = candidate;
                push([candidate, neighbor]);
            }
        }
    }
    return best[end_node];
};
