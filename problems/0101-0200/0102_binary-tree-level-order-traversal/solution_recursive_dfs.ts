function levelOrder(root: TreeNode | null): number[][] {
    // One list per depth, appended to the first time the walk reaches that
    // depth; afterwards it already exists for every later arrival.
    const grouped: number[][] = [];
    if (root === null || root === undefined) {
        return grouped;
    }
    // Pre-order: record the value before descending, so arrivals at each
    // depth happen left to right.
    const visit = (node: TreeNode, depth: number): void => {
        if (grouped.length === depth) {
            grouped.push([]);
        }
        grouped[depth]!.push(node.val);
        if (node.left !== null && node.left !== undefined) {
            visit(node.left, depth + 1);
        }
        if (node.right !== null && node.right !== undefined) {
            visit(node.right, depth + 1);
        }
    };
    visit(root, 0);
    return grouped;
}
