/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    const paths = [];
    // Pre-order walk carrying the half-built string: each step appends
    // "->" and the child's value, and a leaf commits the whole path.
    function walk(node, path) {
        const extended = path + node.val;
        // A leaf is a node with no children — both absent. A node with
        // only one child is a pass-through, never a terminal.
        if (node.left === null && node.right === null) {
            paths.push(extended);
            return;
        }
        // Left subtree before right, so paths are emitted in the order
        // the pinned depth-first walk meets the leaves.
        if (node.left !== null) walk(node.left, extended + "->");
        if (node.right !== null) walk(node.right, extended + "->");
    }
    // The constraints guarantee at least one node, so root is never null.
    walk(root, "");
    return paths;
};
