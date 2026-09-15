function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }
    // A node can only be judged once both of its children's heights are
    // known, so the walk is post-order — children before the node — on
    // an explicit stack of {node, measured} frames: the first pop pushes
    // the node's own merge beneath its two children, and that merge —
    // the second pop — can only fire once both subtrees are measured.
    // Iterating keeps a 500-node chain's ~500 merges off the 512k V8
    // stack this judge runs Node with.
    const heights = new Map<TreeNode, number>();
    const smallest = new Map<TreeNode, TreeNode>();
    const stack: Array<{ node: TreeNode; measured: boolean }> = [{ node: root, measured: false }];
    while (stack.length > 0) {
        const frame = stack.pop()!;
        if (!frame.measured) {
            stack.push({ node: frame.node, measured: true });
            if (frame.node.right !== null) {
                stack.push({ node: frame.node.right, measured: false });
            }
            if (frame.node.left !== null) {
                stack.push({ node: frame.node.left, measured: false });
            }
            continue;
        }
        const lh = frame.node.left === null ? 0 : heights.get(frame.node.left)!;
        const rh = frame.node.right === null ? 0 : heights.get(frame.node.right)!;
        heights.set(frame.node, 1 + Math.max(lh, rh));
        // Equal heights: each side reaches this subtree's deepest level,
        // so its deepest nodes sit on both sides and only this node
        // covers them all — it is the subtree's answer. Unequal: no
        // deepest node can live in the shallower side, so the deeper
        // side's answer passes through unchanged.
        if (lh === rh) {
            smallest.set(frame.node, frame.node);
        } else {
            const deeper = lh > rh ? frame.node.left! : frame.node.right!;
            smallest.set(frame.node, smallest.get(deeper)!);
        }
    }
    return smallest.get(root)!;
}
