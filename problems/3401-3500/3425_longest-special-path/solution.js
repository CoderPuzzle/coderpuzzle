/**
 * @param {number[][]} edges
 * @param {number[]} nums
 * @return {number[]}
 */
var longestSpecialPath = function (edges, nums) {
    const n = nums.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    let bestLen = 0;
    let bestNodes = 1; // a single node is always a valid special path
    const distPath = [];
    const last = new Map(); // value -> depth of last occurrence
    let startDepth = 0;
    const lastRestore = [];
    const startRestore = [];

    // Events: [node, parent, depth, dist, isExit]
    const st = [[0, -1, 0, 0, 0]];
    while (st.length) {
        const [u, par, depth, d, isExit] = st.pop();
        if (isExit) {
            distPath.pop();
            const val = nums[u];
            const prevLast = lastRestore.pop();
            if (prevLast >= 0) {
                last.set(val, prevLast);
            } else {
                last.delete(val);
            }
            startDepth = startRestore.pop();
            continue;
        }
        // Enter node u.
        distPath.push(d);
        const val = nums[u];
        const prevLast = last.has(val) ? last.get(val) : -1;
        lastRestore.push(prevLast);
        startRestore.push(startDepth);
        if (prevLast >= startDepth) {
            startDepth = prevLast + 1;
        }
        last.set(val, depth);
        const length = d - distPath[startDepth];
        const nodes = depth - startDepth + 1;
        if (length > bestLen) {
            bestLen = length;
            bestNodes = nodes;
        } else if (length === bestLen && nodes < bestNodes) {
            bestNodes = nodes;
        }
        st.push([u, par, depth, d, 1]);
        for (const [v, w] of adj[u]) {
            if (v !== par) {
                st.push([v, u, depth + 1, d + w, 0]);
            }
        }
    }
    return [bestLen, bestNodes];
};
