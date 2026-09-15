function closestKValues(root: TreeNode | null, target: number, k: number): number[] {
    // Explicit-stack inorder: the BST flattened to its sorted values, with
    // no recursion that a 10^4-node chain could overflow.
    const values: number[] = [];
    const stack: TreeNode[] = [];
    let node = root;
    while (stack.length > 0 || node !== null) {
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop()!;
        values.push(node.val);
        node = node.right;
    }
    // Over sorted values the distance to target is V-shaped, so the k
    // closest form one window: start at the split and grow it, each step
    // taking the nearer frontier. A tie goes left — the smaller value —
    // so the picks come out in the statement's pinned order directly.
    let left = 0;
    while (left < values.length && values[left] < target) {
        left++;
    }
    let right = left;
    left--;
    const result: number[] = [];
    for (let i = 0; i < k; ++i) {
        if (
            right === values.length ||
            (left >= 0 && Math.abs(values[left] - target) <= Math.abs(values[right] - target))
        ) {
            result.push(values[left]);
            left--;
        } else {
            result.push(values[right]);
            right++;
        }
    }
    return result;
}
