/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number[]}
 */
var getCoprimes = function (nums, edges) {
    // Values only reach 50, so track ancestors per value: on the current
    // root path, stacks[v] holds the nodes carrying value v, deepest last.
    // A node's answer is the deepest stack top among the values coprime
    // with its own.
    const n = nums.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    const coprimes = Array.from({ length: 51 }, () => []);
    for (let v = 1; v <= 50; v++) {
        for (let w = 1; w <= 50; w++) {
            if (gcd(v, w) === 1) coprimes[v].push(w);
        }
    }

    const ans = new Array(n).fill(-1);
    const depth = new Array(n).fill(0);
    const stacks = Array.from({ length: 51 }, () => []);
    // The tree can be one 1e5-deep chain, so the traversal is iterative:
    // enter frames answer a node against the current stacks and push it
    // onto its value's stack, exit frames pop it again.
    const stack = [[0, -1, false]];
    while (stack.length > 0) {
        const [node, parent, leaving] = stack.pop();
        if (leaving) {
            stacks[nums[node]].pop();
            continue;
        }
        let best = -1;
        let bestDepth = -1;
        for (const w of coprimes[nums[node]]) {
            const candidates = stacks[w];
            if (candidates.length > 0) {
                const top = candidates[candidates.length - 1];
                if (depth[top] > bestDepth) {
                    best = top;
                    bestDepth = depth[top];
                }
            }
        }
        ans[node] = best;
        stacks[nums[node]].push(node);
        stack.push([node, parent, true]);
        for (const y of adj[node]) {
            if (y !== parent) {
                depth[y] = depth[node] + 1;
                stack.push([y, node, false]);
            }
        }
    }
    return ans;
};

var gcd = function (a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
};
