/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
    const deleted = new Set(to_delete);
    const forest = [];
    const dfs = (node) => {
        if (node === null) return null;
        // Recurse into both children first; the pruned results reattach
        // below, so deletions deep in the tree are already settled.
        node.left = dfs(node.left);
        node.right = dfs(node.right);
        if (deleted.has(node.val)) {
            // This node vanishes; whichever children survived are cut
            // loose here and become new tree roots.
            if (node.left !== null) forest.push(node.left);
            if (node.right !== null) forest.push(node.right);
            return null;
        }
        return node;
    };
    const remaining = dfs(root);
    // The one surviving root no deletion created is the original root.
    if (remaining !== null) forest.push(remaining);
    return forest;
};
