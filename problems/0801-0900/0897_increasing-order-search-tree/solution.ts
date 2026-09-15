function increasingBST(root: TreeNode | null): TreeNode | null {
    // The required tree's values, read from its root down its only
    // right links, are ascending — exactly the order an in-order walk
    // of a binary search tree visits. So the answer is that walk,
    // relinked: the leftmost node (visited first) becomes the root,
    // every left link is severed, every right link points at the next
    // visited node. The traversal carries its own stack of deferred
    // nodes rather than recursing, so no runtime call stack is touched
    // at all: the stack holds the current left spine only.
    const nodes: TreeNode[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;
    while (current !== null || stack.length > 0) {
        // Descend one left spine, deferring every node on it.
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        // The stack top is now the leftmost unvisited node: visit it
        // and continue the walk in its right subtree.
        const node = stack.pop()!;
        nodes.push(node);
        current = node.right;
    }
    // Relink the visit order into the spine: the last node keeps no
    // right child, and no node keeps a left child.
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].left = null;
        nodes[i].right = i + 1 < nodes.length ? nodes[i + 1] : null;
    }
    return nodes.length > 0 ? nodes[0] : null;
}
