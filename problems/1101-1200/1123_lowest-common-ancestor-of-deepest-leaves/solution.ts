function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;
    // A pre-order stack walk lists parents before children, so the reversed
    // list settles every child's height before its parent reads it.
    const order: TreeNode[] = [];
    const stack: TreeNode[] = [root];
    while (stack.length > 0) {
        const node = stack.pop() as TreeNode;
        order.push(node);
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
    }
    const height = new Map<TreeNode, number>(); // deepest leaf depth below
    for (let i = order.length - 1; i >= 0; --i) {
        const node = order[i];
        let best = -1;
        if (node.left !== null) best = Math.max(best, height.get(node.left) as number);
        if (node.right !== null) best = Math.max(best, height.get(node.right) as number);
        height.set(node, best + 1);
    }
    // Descend toward the taller child; a tie means both sides reach the
    // deepest leaves, so this node is their lowest common ancestor.
    let node = root;
    while (true) {
        const leftH = node.left === null ? -1 : (height.get(node.left) as number);
        const rightH = node.right === null ? -1 : (height.get(node.right) as number);
        if (leftH > rightH) node = node.left as TreeNode;
        else if (rightH > leftH) node = node.right as TreeNode;
        else return node;
    }
}
