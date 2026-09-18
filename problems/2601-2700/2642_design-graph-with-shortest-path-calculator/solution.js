class MinHeap {
    constructor() {
        this.items = [];
    }

    get size() {
        return this.items.length;
    }

    push(item) {
        const items = this.items;
        items.push(item);
        let child = items.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (items[parent][0] <= items[child][0]) {
                break;
            }
            [items[parent], items[child]] = [items[child], items[parent]];
            child = parent;
        }
    }

    pop() {
        const items = this.items;
        const top = items[0];
        const last = items.pop();
        if (items.length > 0) {
            items[0] = last;
            let parent = 0;
            for (;;) {
                let smallest = parent;
                const left = 2 * parent + 1;
                const right = left + 1;
                if (left < items.length && items[left][0] < items[smallest][0]) {
                    smallest = left;
                }
                if (right < items.length && items[right][0] < items[smallest][0]) {
                    smallest = right;
                }
                if (smallest === parent) {
                    break;
                }
                [items[parent], items[smallest]] = [items[smallest], items[parent]];
                parent = smallest;
            }
        }
        return top;
    }
}

class Graph {
    constructor(n, edges) {
        // Edges are only appended, never removed or reweighted, so a
        // plain adjacency list never needs invalidating or rebuilding.
        this.adjacency = Array.from({ length: n }, () => []);
        for (const [source, target, cost] of edges) {
            this.adjacency[source].push([target, cost]);
        }
    }

    addEdge(edge) {
        const [source, target, cost] = edge;
        this.adjacency[source].push([target, cost]);
    }

    shortestPath(node1, node2) {
        if (node1 === node2) {
            return 0;
        }
        // Every cost is positive, so Dijkstra applies: the min-heap
        // hands out nodes in settle order by tentative distance.
        const distance = new Array(this.adjacency.length).fill(Infinity);
        distance[node1] = 0;
        const heap = new MinHeap();
        heap.push([0, node1]);
        while (heap.size > 0) {
            const [soFar, node] = heap.pop();
            // Stale entry: the node was already settled through a
            // cheaper route, so skip it.
            if (soFar > distance[node]) {
                continue;
            }
            // Popping node2 settles it, so its distance is final here.
            if (node === node2) {
                return soFar;
            }
            for (const [neighbor, cost] of this.adjacency[node]) {
                const candidate = soFar + cost;
                // Only improving relaxations push a fresh entry, so any
                // entry goes stale at most once.
                if (candidate < distance[neighbor]) {
                    distance[neighbor] = candidate;
                    heap.push([candidate, neighbor]);
                }
            }
        }
        return -1;
    }
}
