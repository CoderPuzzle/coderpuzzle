/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
    const n = graph.length;
    // Kahn's peel on the reversed graph: a node is safe exactly
    // when every path from it terminates.
    const outdeg = new Array(n);
    const radj = new Array(n);
    for (let u = 0; u < n; u++) {
        outdeg[u] = graph[u].length;
        radj[u] = [];
    }
    for (let u = 0; u < n; u++) {
        for (const v of graph[u]) {
            radj[v].push(u);
        }
    }
    // Terminal nodes (out-degree 0) are trivially safe seeds.
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (outdeg[i] === 0) {
            queue.push(i);
        }
    }
    const safe = new Array(n).fill(false);
    let head = 0;
    while (head < queue.length) {
        const u = queue[head];
        head++;
        safe[u] = true;
        // A predecessor queues only once every outgoing neighbor
        // is proven safe — the definition of a safe node.
        for (const v of radj[u]) {
            outdeg[v]--;
            if (outdeg[v] === 0) {
                queue.push(v);
            }
        }
    }
    // Unpeeled nodes are exactly those on, or reaching, a cycle;
    // the ascending scan yields the required sorted order.
    const result = [];
    for (let i = 0; i < n; i++) {
        if (safe[i]) {
            result.push(i);
        }
    }
    return result;
};
