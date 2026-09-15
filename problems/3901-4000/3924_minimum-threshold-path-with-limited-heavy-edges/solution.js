var minimumThreshold = function (n, edges, source, target, k) {
    if (source === target) return 0;
    const graph = Array.from({ length: n }, () => []);
    let high = 0;
    for (const [u, v, weight] of edges) {
        graph[u].push([v, weight]);
        graph[v].push([u, weight]);
        high = Math.max(high, weight);
    }
    const feasible = (threshold) => {
        const distance = Array(n).fill(k + 1);
        const queue = Array(4 * edges.length + 2 * n + 3);
        let left = 2 * edges.length + n + 1;
        let right = left + 1;
        queue[left] = source;
        distance[source] = 0;
        while (left < right) {
            const node = queue[left++];
            for (const [neighbor, weight] of graph[node]) {
                const cost = weight > threshold ? 1 : 0;
                const candidate = distance[node] + cost;
                if (candidate < distance[neighbor] && candidate <= k) {
                    distance[neighbor] = candidate;
                    if (cost === 0) queue[--left] = neighbor;
                    else queue[right++] = neighbor;
                }
            }
        }
        return distance[target] <= k;
    };
    if (!feasible(high)) return -1;
    let low = 0;
    while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (feasible(middle)) high = middle;
        else low = middle + 1;
    }
    return low;
};
