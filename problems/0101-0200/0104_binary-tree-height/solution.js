/*
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var binaryTreeHeight = function (root) {
    // Loop invariant: `level` holds exactly one level's nodes, so one full
    // round of rebuilding it counts exactly one level of depth.
    let depth = 0;
    let level = root === null ? [] : [root];
    while (level.length > 0) {
        depth++;
        // Collect only the real children, so nodes of two levels never mix
        // inside one frontier and a leaf contributes nothing.
        const next = [];
        for (const node of level) {
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        level = next;
    }
    return depth;
};
