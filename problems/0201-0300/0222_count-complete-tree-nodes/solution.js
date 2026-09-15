/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    const depth = function (node, left) {
        // Walk one spine (all-left or all-right) to measure its depth.
        let d = 0;
        while (node !== null) {
            d += 1;
            node = left ? node.left : node.right;
        }
        return d;
    };

    if (root === null) {
        return 0;
    }
    const leftDepth = depth(root, true);
    const rightDepth = depth(root, false);
    // Equal spine depths => the subtree is perfect: count it in closed
    // form, 2^d - 1, with no per-node traversal.
    if (leftDepth === rightDepth) {
        return (1 << leftDepth) - 1;
    }
    // Ragged bottom: the missing nodes sit against the right side, so at
    // least one child is itself perfect and only the other recurses.
    return 1 + countNodes(root.left) + countNodes(root.right);
};
