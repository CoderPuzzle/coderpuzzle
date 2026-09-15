function correctBinaryTree(root: TreeNode | null, fromNode: number, toNode: number): TreeNode | null {
    // The tree arrives clean — the defect exists only after the
    // custom-testing step — so the first walk rebuilds it: every node
    // recorded by value, the fromNode node's empty right slot pointed
    // at the toNode node. The correction is a breadth-first sweep that
    // takes each level right to left, marking nodes seen on enqueue and
    // carrying each node's parent alongside it. toNode sits right of
    // fromNode on the same depth, so by the time fromNode is dequeued
    // its right child is already seen — and no other node can pass
    // that test, because in a tree every child is enqueued exactly
    // once, by its own parent; only the wired edge breaks that.
    const byValue = new Map<number, TreeNode>();
    const walk: (TreeNode | null)[] = [root];
    while (walk.length > 0) {
        const node = walk.pop()!;
        if (node === null) {
            continue;
        }
        byValue.set(node.val, node);
        walk.push(node.left, node.right);
    }
    byValue.get(fromNode)!.right = byValue.get(toNode)!;
    const seen = new Set<TreeNode | null>([root]);
    const queue: { node: TreeNode | null; parent: TreeNode | null }[] = [{ node: root, parent: null }];
    for (let head = 0; head < queue.length; head++) {
        const frame = queue[head]!;
        if (frame.node === null) {
            continue;
        }
        if (frame.node.right !== null && seen.has(frame.node.right)) {
            // detach the offender through the parent beside it
            if (frame.parent!.left === frame.node) {
                frame.parent!.left = null;
            } else {
                frame.parent!.right = null;
            }
            return root;
        }
        if (frame.node.right !== null) {
            seen.add(frame.node.right);
            queue.push({ node: frame.node.right, parent: frame.node });
        }
        if (frame.node.left !== null) {
            seen.add(frame.node.left);
            queue.push({ node: frame.node.left, parent: frame.node });
        }
    }
    return root;
}
