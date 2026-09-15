function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];
    if (root === null) {
        // The empty tree has no root-to-leaf paths at all.
        return result;
    }
    // `path` is one shared buffer: every accepted path is a copy, and the
    // walk truncates the buffer back instead of rebuilding it per node.
    const path: number[] = [];
    // Preorder with an explicit stack — the same shape in every language,
    // chosen because recursion would overflow Python's call-stack limit
    // on a 5000-node chain. Each entry carries the node, the remaining sum
    // before paying for it, and the buffer length on entry: popping the
    // entry later truncates `path` to that prefix, which is exactly the
    // backtracking a recursive call stack would have performed.
    const stack: Array<[TreeNode, number, number]> = [[root, targetSum, 0]];
    while (stack.length > 0) {
        const [node, remainingIn, depth] = stack.pop()!;
        path.length = depth;
        path.push(node.val);
        const remaining = remainingIn - node.val;
        if (node.left === null && node.right === null) {
            if (remaining === 0) {
                // A leaf whose root-to-leaf sum is on target: record a
                // copy, since `path` keeps mutating after this point.
                result.push([...path]);
            }
            continue;
        }
        // Push the right child first so the left subtree is popped first:
        // matching paths are discovered in preorder, left to right.
        if (node.right !== null) {
            stack.push([node.right, remaining, depth + 1]);
        }
        if (node.left !== null) {
            stack.push([node.left, remaining, depth + 1]);
        }
    }
    return result;
}
