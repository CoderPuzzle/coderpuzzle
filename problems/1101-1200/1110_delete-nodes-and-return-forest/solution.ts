function delNodes(root: TreeNode | null, to_delete: number[]): (TreeNode | null)[] {
    const deleted = new Set(to_delete);
    const forest: TreeNode[] = [];
    const dfs = (node: TreeNode | null): TreeNode | null => {
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
}
