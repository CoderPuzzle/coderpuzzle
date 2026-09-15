function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
    // Value -> postorder index: makes the left subtree's size an O(1)
    // lookup instead of a scan. Values are unique, so a hit names the one
    // place the left subtree's postorder segment ends.
    const index = new Map<number, number>();
    for (let i = 0; i < postorder.length; i++) {
        index.set(postorder[i], i);
    }
    // build(low, high, postLow) raises the subtree over the preorder range
    // [low, high); its postorder segment starts at postLow. The 30-node
    // ceiling bounds the nesting at 30 calls, so plain recursion is safe
    // in this judge's every runtime.
    const build = (low: number, high: number, postLow: number): TreeNode | null => {
        if (low >= high) {
            // An empty range is a missing subtree.
            return null;
        }
        const node = new TreeNode(preorder[low]);
        if (high - low === 1) {
            // The subtree is a lone leaf: no child split to find.
            return node;
        }
        // The value right behind the root roots the subtree that follows.
        // Postorder ends that subtree with its own root, so
        // [postLow, index.get(...)] is exactly the left subtree and its
        // size is one past that position.
        const leftSize = index.get(preorder[low + 1])! + 1 - postLow;
        node.left = build(low + 1, low + 1 + leftSize, postLow);
        // Whatever remains is the right subtree. When the root really has
        // one child, the left range swallowed the whole remainder and this
        // range comes back empty -- the only child stays on the left, the
        // required answer, with no branch needed.
        node.right = build(low + 1 + leftSize, high, postLow + leftSize);
        return node;
    };
    return build(0, preorder.length, 0);
}
