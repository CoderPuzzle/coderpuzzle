/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function (n, k, invocations) {
    const graph = Array.from({ length: n }, () => []);
    for (const [a, b] of invocations) {
        graph[a].push(b);
    }
    // Iterative DFS from k: a 10^5-long invocation chain would overflow
    // the recursion stack under the judged limits.
    const suspicious = new Array(n).fill(false);
    suspicious[k] = true;
    const stack = [k];
    while (stack.length > 0) {
        const node = stack.pop();
        for (const nxt of graph[node]) {
            if (!suspicious[nxt]) {
                suspicious[nxt] = true;
                stack.push(nxt);
            }
        }
    }
    // The group may only be removed when no outside method invokes
    // into it; otherwise nothing is removed at all.
    for (const [a, b] of invocations) {
        if (!suspicious[a] && suspicious[b]) return Array.from({ length: n }, (_, i) => i);
    }
    const remaining = [];
    for (let node = 0; node < n; node++) {
        if (!suspicious[node]) remaining.push(node);
    }
    return remaining;
};
