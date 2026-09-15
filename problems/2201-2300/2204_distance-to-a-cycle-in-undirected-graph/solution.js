/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var distanceToCycle = function (n, edges) {
    const adj = Array.from({ length: n }, () => []);
    const degree = new Array(n).fill(0);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
        degree[a] += 1;
        degree[b] += 1;
    }

    // peel off degree-1 leaves; whatever remains is the unique cycle
    const removed = new Array(n).fill(false);
    const queue = [];
    let head = 0;
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) queue.push(i);
    }
    while (head < queue.length) {
        const u = queue[head++];
        removed[u] = true;
        for (const v of adj[u]) {
            if (!removed[v]) {
                degree[v] -= 1;
                if (degree[v] === 1) queue.push(v);
            }
        }
    }

    // multi-source BFS from all cycle nodes
    const dist = new Array(n).fill(0);
    const visited = new Array(n).fill(false);
    const bfs = [];
    let bfsHead = 0;
    for (let u = 0; u < n; u++) {
        if (!removed[u]) {
            visited[u] = true;
            bfs.push(u);
        }
    }
    while (bfsHead < bfs.length) {
        const u = bfs[bfsHead++];
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                dist[v] = dist[u] + 1;
                bfs.push(v);
            }
        }
    }
    return dist;
};
