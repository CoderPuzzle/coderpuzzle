/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val); this.left = (left===undefined ? null : left); this.right = (right===undefined ? null : right); }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {number} target
 * @return {TreeNode}
 */
var getTargetCopy = function (original, cloned, target) {
    // Parallel preorder: identical shapes keep every pair aligned.
    const stack = [[original, cloned]];
    while (stack.length > 0) {
        const [origNode, cloneNode] = stack.pop();
        if (origNode === null) continue;
        if (origNode.val === target) return cloneNode;
        stack.push([origNode.left, cloneNode.left]);
        stack.push([origNode.right, cloneNode.right]);
    }
    return null;
};
