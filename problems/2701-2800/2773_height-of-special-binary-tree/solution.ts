function heightOfTree(root: TreeNode | null): number {
    if (root === null) return 0;
    // A leaf of the special tree is the one node the display cannot mark:
    // the ring gives every leaf both children, and the previous leaf's
    // right child points back at the leaf itself.
    const isLeaf = (node: TreeNode): boolean => node.left !== null && node.left.right === node;
    // Returns the subtree's height -- its longest downward path in edges
    // -- stopping at the ring-wired leaves.
    const height = (node: TreeNode | null): number => {
        if (node === null || isLeaf(node)) return 0;
        const left = node.left === null ? 0 : height(node.left);
        const right = node.right === null ? 0 : height(node.right);
        return 1 + Math.max(left, right);
    };
    return height(root);
}
