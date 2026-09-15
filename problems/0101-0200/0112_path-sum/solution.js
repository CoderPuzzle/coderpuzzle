/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    // The empty tree has no root-to-leaf path at all, so no
    // targetSum — not even 0 — can be matched.
    if (root === null) return false;
    // Loop invariant: the stack holds [node, remaining] pairs where
    // remaining is targetSum minus the sum of the values strictly
    // above `node`, so a leaf settles its whole path in one compare.
    const stack = [[root, targetSum]];
    while (stack.length > 0) {
        const [node, remaining] = stack.pop();
        if (node.left === null && node.right === null) {
            // The path ends here, so it qualifies exactly when the
            // leaf itself covers what is still owed.
            if (remaining === node.val) return true;
        } else {
            // An internal node never decides: only leaves can match,
            // even when the running sum already equals targetSum.
            if (node.left !== null) stack.push([node.left, remaining - node.val]);
            if (node.right !== null) stack.push([node.right, remaining - node.val]);
        }
    }
    return false;
};
