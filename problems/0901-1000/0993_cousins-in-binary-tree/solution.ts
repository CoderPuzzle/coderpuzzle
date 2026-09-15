function isCousins(root: TreeNode | null, x: number, y: number): boolean {
    // Cousinhood is a fact about two coordinates, not about either node
    // alone: the depth a node sits at and the parent it hangs from. One
    // descent — an explicit stack whose frames are (node, depth, parent
    // value) — records both coordinates for the nodes valued x and y, and
    // stops the moment the second of them is met. The verdict then reads
    // straight off the records: same depth, different parents. The root
    // rides with the sentinel parent 0, harmless because no node value is
    // 0 and the root is alone at depth 0.
    let depthX = -1;
    let depthY = -1;
    let parentX = 0;
    let parentY = 0;
    const pending = [{ node: root, depth: 0, parent: 0 }];
    while (pending.length > 0) {
        const frame = pending.pop()!;
        if (frame.node === null) {
            continue;
        }
        if (frame.node.val === x) {
            depthX = frame.depth;
            parentX = frame.parent;
        } else if (frame.node.val === y) {
            depthY = frame.depth;
            parentY = frame.parent;
        }
        if (depthX >= 0 && depthY >= 0) {
            break;
        }
        if (frame.node.right !== null) {
            pending.push({ node: frame.node.right, depth: frame.depth + 1, parent: frame.node.val });
        }
        if (frame.node.left !== null) {
            pending.push({ node: frame.node.left, depth: frame.depth + 1, parent: frame.node.val });
        }
    }
    return depthX === depthY && parentX !== parentY;
}
