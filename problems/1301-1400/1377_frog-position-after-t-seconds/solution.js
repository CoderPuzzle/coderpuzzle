/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} t
 * @param {number} target
 * @return {number}
 */
var frogPosition = function (n, edges, t, target) {
    if (n === 1) return 1.0;
    const neighbors = Array.from({ length: n + 1 }, () => []);
    for (const [a, b] of edges) {
        neighbors[a].push(b);
        neighbors[b].push(a);
    }

    // BFS from vertex 1; probability splits equally among unvisited children.
    // A leaf keeps its probability: the frog stays there forever.
    const prob = new Array(n + 1).fill(0);
    const depth = new Array(n + 1).fill(0);
    const visited = new Array(n + 1).fill(false);
    const childCount = new Array(n + 1).fill(0);
    const queue = [1];
    prob[1] = 1.0;
    visited[1] = true;
    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];
        let children = 0;
        for (const nxt of neighbors[node]) if (!visited[nxt]) children++;
        childCount[node] = children;
        if (children > 0) {
            for (const nxt of neighbors[node]) {
                if (visited[nxt]) continue;
                visited[nxt] = true;
                depth[nxt] = depth[node] + 1;
                prob[nxt] = prob[node] / children;
                queue.push(nxt);
            }
        }
    }

    if (depth[target] === t) return prob[target];
    if (depth[target] < t && childCount[target] === 0) return prob[target];
    return 0.0;
};
