function sufficientSubset(root: TreeNode | null, limit: number): TreeNode | null {
    // Post-order with an explicit stack. Each frame is
    // [node, remaining, parent, isLeft, revisited]: the first visit pushes
    // the children with the budget reduced by the node's value, and the
    // second visit decides keep-or-prune once the children are pruned in
    // place. A leaf survives iff its value clears the remaining budget; an
    // internal node survives iff at least one child survived.
    const stack: Array<[TreeNode | null, number, TreeNode | null, boolean, boolean]> = [
        [root, limit, null, false, false],
    ];
    let result: TreeNode | null = null;
    while (stack.length > 0) {
        const [node, remaining, parent, isLeft, revisited] = stack.pop()!;
        if (node === null) continue;
        if (!revisited) {
            if (node.left === null && node.right === null) {
                if (node.val < remaining) {
                    if (parent === null) {
                        result = null;
                    } else if (isLeft) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                } else if (parent === null) {
                    result = node;
                }
                continue;
            }
            stack.push([node, remaining, parent, isLeft, true]);
            stack.push([node.right, remaining - node.val, node, false, false]);
            stack.push([node.left, remaining - node.val, node, true, false]);
        } else if (node.left === null && node.right === null) {
            // Both children were pruned, so no leaf below reaches limit.
            if (parent === null) {
                result = null;
            } else if (isLeft) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        } else if (parent === null) {
            result = node;
        }
    }
    return result;
}
