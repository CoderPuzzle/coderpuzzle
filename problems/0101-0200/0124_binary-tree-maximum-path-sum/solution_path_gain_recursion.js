/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    // A path must contain at least one node, so start at -Infinity, not 0.
    let best = -Infinity;

    // Best path that starts at `node` and descends into at most one child.
    function gain(node) {
        if (node === null) {
            return 0;
        }
        // Clamp each child's gain at 0: a negative branch is better left unvisited.
        const left = Math.max(gain(node.left), 0);
        const right = Math.max(gain(node.right), 0);
        // The path bending through this node is a candidate for the global answer.
        best = Math.max(best, node.val + left + right);
        // The parent may only extend the path through one side.
        return node.val + Math.max(left, right);
    }

    gain(root);
    return best;
};
