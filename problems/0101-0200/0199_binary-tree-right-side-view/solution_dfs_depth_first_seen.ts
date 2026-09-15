function rightSideView(root: TreeNode | null): number[] {
    // Depth-first with the right child tried first: at every depth the
    // first node popped is the rightmost one there, the node the right
    // edge sees.
    const view: number[] = [];
    const stack: { node: TreeNode; depth: number }[] = [];
    if (root !== null) {
        stack.push({ node: root, depth: 0 });
    }
    while (stack.length > 0) {
        const { node, depth } = stack.pop()!;
        // A depth earns its entry only on that first arrival; every later
        // node popped at the same depth sits further left.
        if (depth === view.length) {
            view.push(node.val);
        }
        // Left pushed before right, so the right child pops first.
        if (node.left !== null) {
            stack.push({ node: node.left, depth: depth + 1 });
        }
        if (node.right !== null) {
            stack.push({ node: node.right, depth: depth + 1 });
        }
    }
    return view;
}
