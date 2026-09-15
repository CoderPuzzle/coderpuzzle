/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of connections) {
        adj[a].push([b, 1]); // original direction a -> b
        adj[b].push([a, 0]);
    }
    let changed = 0;
    const visited = new Array(n).fill(false);
    const stack = [0];
    visited[0] = true;
    while (stack.length > 0) {
        const node = stack.pop();
        for (const [nxt, direction] of adj[node]) {
            if (visited[nxt]) continue;
            if (direction === 1) changed++;
            visited[nxt] = true;
            stack.push(nxt);
        }
    }
    return changed;
};
