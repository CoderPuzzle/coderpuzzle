/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    // A mirror is self-similar: to invert a tree, invert both subtrees
    // and cross them at the root. The recursion bottoms out at null,
    // the empty tree, which is its own mirror.
    if (root === null) {
        return null;
    }
    // Each call returns a subtree already mirrored end-to-end, so the
    // two finished results only need to trade places at this node.
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
