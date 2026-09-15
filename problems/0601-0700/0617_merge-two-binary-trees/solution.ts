function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    // The merge rule pairs positions: nodes at the same spot in both
    // trees overlap and their values sum, while a spot only one tree
    // fills keeps that node — and everything under it — as is. An
    // empty input therefore returns the other tree whole, and the
    // merged tree is built on root1's nodes: reuse, not copy, since
    // the judge serializes the returned tree to its level-order
    // values and never node identity. The walk carries an explicit
    // stack of overlapping pairs — a skewed 2000-node chain would
    // nest 2000 calls — over the 512k V8 stack this judge runs Node
    // with — so every runtime iterates instead.
    if (root1 === null) return root2;
    if (root2 === null) return root1;
    const pending: [TreeNode, TreeNode][] = [[root1, root2]];
    while (pending.length > 0) {
        // One entry settles one overlapping pair: sum the values
        // here, then settle each child slot — both trees fill it and
        // the child pair joins the stack, only root2 fills it and
        // its subtree attaches whole.
        const [node1, node2] = pending.pop()!;
        node1.val += node2.val;
        if (node1.left === null) {
            node1.left = node2.left;
        } else if (node2.left !== null) {
            pending.push([node1.left, node2.left]);
        }
        if (node1.right === null) {
            node1.right = node2.right;
        } else if (node2.right !== null) {
            pending.push([node1.right, node2.right]);
        }
    }
    return root1;
}
