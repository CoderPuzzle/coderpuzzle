function getLonelyNodes(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root === null) {
        return result;
    }
    // Explicit stack: a 1000-deep chain must not recurse.
    const stack: TreeNode[] = [root];
    while (stack.length > 0) {
        const node = stack.pop()!;
        if (node.left !== null && node.right === null) {
            result.push(node.left.val);
        } else if (node.right !== null && node.left === null) {
            result.push(node.right.val);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
        if (node.right !== null) {
            stack.push(node.right);
        }
    }
    return result;
}
