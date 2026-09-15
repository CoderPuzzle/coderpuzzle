/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function (n, edges) {
    // components answer the question: all C(n, 2) pairs minus the pairs
    // inside one component, so enumerate each component exactly once
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        // an undirected edge is walkable both ways, so each endpoint
        // records the other as a neighbour
        adj[a].push(b);
        adj[b].push(a);
    }

    const visited = new Uint8Array(n);
    // a flat array with a read cursor serves as the queue: push is the
    // append, the advancing cursor the pop. The walk is iterative end to
    // end -- recursive DFS would nest 10^5 frames on one long component
    let reachable = 0;
    for (let seed = 0; seed < n; seed++) {
        if (visited[seed]) continue;
        visited[seed] = 1;
        const queue = [seed];
        // marking a node when it is enqueued, not when it is dequeued,
        // keeps every node in the queue exactly once
        for (let head = 0; head < queue.length; head++) {
            for (const v of adj[queue[head]]) {
                if (!visited[v]) {
                    visited[v] = 1;
                    queue.push(v);
                }
            }
        }
        // the queue now holds precisely this component: its size*(size-1)/2
        // internal pairs are exactly the reachable pairs it contributes
        const size = queue.length;
        reachable += (size * (size - 1)) / 2;
    }
    // whatever remains of C(n, 2) counts each unreachable pair once
    return (n * (n - 1)) / 2 - reachable;
};
