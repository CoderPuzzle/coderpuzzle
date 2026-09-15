/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function (root, start) {
    // Infection crosses one edge per minute in both directions, so the
    // answer is the maximum distance from `start` once parent edges are
    // added. BFS layers off an adjacency map measure it.
    const adj = new Map();
    const link = (a, b) => {
        if (!adj.has(a)) adj.set(a, []);
        if (!adj.has(b)) adj.set(b, []);
        adj.get(a).push(b);
        adj.get(b).push(a);
    };
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        if (node === null) continue;
        if (node.left !== null) {
            link(node.val, node.left.val);
            stack.push(node.left);
        }
        if (node.right !== null) {
            link(node.val, node.right.val);
            stack.push(node.right);
        }
    }
    const seen = new Set([start]);
    let frontier = [start];
    let minutes = 0;
    while (frontier.length > 0) {
        const next = [];
        for (const u of frontier) {
            for (const v of adj.get(u) ?? []) {
                if (!seen.has(v)) {
                    seen.add(v);
                    next.push(v);
                }
            }
        }
        if (next.length === 0) break;
        ++minutes;
        frontier = next;
    }
    return minutes;
};
