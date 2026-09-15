var minCost = function (n, prices, roads) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, cost, tax] of roads) {
        graph[u].push([v, cost, cost * tax]);
        graph[v].push([u, cost, cost * tax]);
    }
    const dijkstra = (start, loaded) => {
        const distance = Array(n).fill(Infinity);
        const heap = [];
        const push = (item) => {
            let index = heap.length;
            heap.push(item);
            while (index > 0) {
                const parent = Math.floor((index - 1) / 2);
                if (heap[parent][0] <= item[0]) break;
                heap[index] = heap[parent];
                index = parent;
            }
            heap[index] = item;
        };
        const pop = () => {
            const first = heap[0];
            const last = heap.pop();
            if (heap.length > 0) {
                let index = 0;
                while (index * 2 + 1 < heap.length) {
                    let child = index * 2 + 1;
                    if (child + 1 < heap.length && heap[child + 1][0] < heap[child][0]) child++;
                    if (heap[child][0] >= last[0]) break;
                    heap[index] = heap[child];
                    index = child;
                }
                heap[index] = last;
            }
            return first;
        };
        distance[start] = 0;
        push([0, start]);
        while (heap.length > 0) {
            const [current, node] = pop();
            if (current !== distance[node]) continue;
            for (const edge of graph[node]) {
                const candidate = current + edge[loaded ? 2 : 1];
                if (candidate < distance[edge[0]]) {
                    distance[edge[0]] = candidate;
                    push([candidate, edge[0]]);
                }
            }
        }
        return distance;
    };
    const answer = [];
    for (let start = 0; start < n; start++) {
        const emptyDistance = dijkstra(start, false);
        const loadedDistance = dijkstra(start, true);
        let best = prices[start];
        for (let shop = 0; shop < n; shop++) {
            best = Math.min(best, prices[shop] + emptyDistance[shop] + loadedDistance[shop]);
        }
        answer.push(best);
    }
    return answer;
};
