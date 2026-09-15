function widthOfBinaryTree(root: TreeNode | null): number {
    let best = 0;
    // Depth -> [leftmost, rightmost] frame positions seen at that depth
    // — the two running extremes; the null slots between the end nodes
    // are counted by the arithmetic, never materialized.
    const extremes = new Map<number, [number, number]>();
    // An array used as a stack. Popping the last entry, and pushing the
    // right child before the left, walks the tree root-first, left
    // subtree before right — preorder, which visits every depth in index
    // order.
    const stack: [TreeNode, number, number][] = [];
    if (root !== null) {
        stack.push([root, 0, 0]);
    }
    while (stack.length > 0) {
        const [node, depth, pos] = stack.pop()!;
        let [lo, hi] = extremes.get(depth) ?? [pos, pos];
        if (pos < lo) lo = pos;
        if (pos > hi) hi = pos;
        extremes.set(depth, [lo, hi]);
        const width = hi - lo + 1;
        if (width > best) {
            best = width;
        }
        // Re-base before doubling: raw heap indices double per level
        // and blow past 64 bits on a deep chain. Shifted so the level
        // starts at its leftmost node, a stored index never exceeds
        // twice the level's width; a width is a difference within one
        // level, and the shift leaves every such difference unchanged.
        const rebased = pos - lo;
        if (node.right !== null) stack.push([node.right, depth + 1, 2 * rebased + 1]);
        if (node.left !== null) stack.push([node.left, depth + 1, 2 * rebased]);
    }
    return best;
}
