/*
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function binaryTreeHeight(root: TreeNode | null): number {
    // Loop invariant: `level` holds exactly one level's nodes, so one full
    // round of rebuilding it counts exactly one level of depth.
    let depth = 0;
    let level: TreeNode[] = root === null ? [] : [root];
    while (level.length > 0) {
        depth++;
        // Collect only the real children, so nodes of two levels never mix
        // inside one frontier and a leaf contributes nothing.
        const next: TreeNode[] = [];
        for (const node of level) {
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        level = next;
    }
    return depth;
}
