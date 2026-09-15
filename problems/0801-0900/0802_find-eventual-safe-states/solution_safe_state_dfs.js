/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
    const n = graph.length;
    // Memoized DFS on the graph as given: ask each node directly whether
    // every walk from it terminates, and cache the verdict. The stack is
    // explicit, so a 10^4-deep chain cannot overflow recursion.
    const UNVISITED = 0;
    const VISITING = 1;
    const SAFE = 2;
    const UNSAFE = 3;
    const state = new Array(n).fill(UNVISITED);
    // Per-node scratch for the active frame; a node sits on the stack at
    // most once, so node indexing works for the cursor and the flag.
    const next = new Array(n).fill(0);
    const unsafeChild = new Array(n).fill(false);
    for (let start = 0; start < n; start++) {
        if (state[start] !== UNVISITED) {
            continue; // verdict already memoized by an earlier start
        }
        state[start] = VISITING;
        const stack = [start];
        while (stack.length > 0) {
            const u = stack[stack.length - 1];
            if (next[u] < graph[u].length) {
                const v = graph[u][next[u]];
                next[u]++;
                if (state[v] === VISITING) {
                    // Back edge onto the current path: a cycle runs
                    // through it, so this successor is never safe.
                    unsafeChild[u] = true;
                } else if (state[v] === UNVISITED) {
                    state[v] = VISITING;
                    stack.push(v);
                } else if (state[v] === UNSAFE) {
                    // Memoized danger feeds straight back.
                    unsafeChild[u] = true;
                }
                // A SAFE successor clears the bar on its own.
            } else {
                stack.pop();
                state[u] = unsafeChild[u] ? UNSAFE : SAFE;
                if (unsafeChild[u] && stack.length > 0) {
                    // Danger propagates up: the node below reached it.
                    unsafeChild[stack[stack.length - 1]] = true;
                }
            }
        }
    }
    // The ascending scan yields the required sorted order.
    const result = [];
    for (let i = 0; i < n; i++) {
        if (state[i] === SAFE) {
            result.push(i);
        }
    }
    return result;
};
