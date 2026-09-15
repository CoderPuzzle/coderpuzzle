function heightOfTree(root: TreeNode | null): number {
    if (root === null) return 0;
    // A leaf of the special tree is the one node the display cannot mark:
    // the ring gives every leaf both children, and the previous leaf's
    // right child points back at the leaf itself. A wave only descends
    // from the nodes the test clears, so the ring never joins a wave and
    // every reached node is visited once.
    let frontier: TreeNode[] = [root];
    let height = 0;
    while (true) {
        const wave: TreeNode[] = [];
        for (const node of frontier) {
            if (node.left !== null && node.left.right === node) continue;
            if (node.left !== null) wave.push(node.left);
            if (node.right !== null) wave.push(node.right);
        }
        if (wave.length === 0) return height;
        height++;
        frontier = wave;
    }
}
