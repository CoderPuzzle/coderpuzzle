function widthOfBinaryTree(root: TreeNode | null): number {
    let best = 0;
    const queue: [TreeNode, number][] = [];
    if (root !== null) {
        queue.push([root, 0]);
    }
    while (queue.length > 0) {
        // The queue holds exactly one level, in index order, so its
        // end nodes' indices give the level's width directly — the
        // null slots between them are counted by the arithmetic,
        // never materialized.
        const width = queue[queue.length - 1][1] - queue[0][1] + 1;
        if (width > best) {
            best = width;
        }
        // Re-base before doubling: raw heap indices double per level
        // and blow past 64 bits on a deep chain. Shifted so the level
        // starts at 0, a stored index never exceeds twice the level's
        // width; a width is a difference within one level, and the
        // shift leaves every such difference unchanged.
        const base = queue[0][1];
        const remaining = queue.length;
        for (let i = 0; i < remaining; ++i) {
            const [node, index] = queue.shift()!;
            const rebased = index - base;
            if (node.left !== null) queue.push([node.left, 2 * rebased]);
            if (node.right !== null) queue.push([node.right, 2 * rebased + 1]);
        }
    }
    return best;
}
