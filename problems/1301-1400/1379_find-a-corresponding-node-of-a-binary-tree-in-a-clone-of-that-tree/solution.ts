/**
 * Definition for a binary tree node.
 * class TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) { this.val = (val===undefined ? 0 : val); this.left = (left===undefined ? null : left); this.right = (right===undefined ? null : right); } }
 */
function getTargetCopy(original: TreeNode | null, cloned: TreeNode | null, target: number): TreeNode | null {
    // Parallel preorder: identical shapes keep every pair aligned.
    const stack: Array<[TreeNode | null, TreeNode | null]> = [[original, cloned]];
    while (stack.length > 0) {
        const [origNode, cloneNode] = stack.pop()!;
        if (origNode === null) continue;
        if (origNode.val === target) return cloneNode;
        stack.push([origNode.left, cloneNode.left]);
        stack.push([origNode.right, cloneNode.right]);
    }
    return null;
}
