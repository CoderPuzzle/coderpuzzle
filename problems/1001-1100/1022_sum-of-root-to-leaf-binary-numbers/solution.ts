function sumRootToLeaf(root: TreeNode | null): number {
    // The node range [1, 1000] guarantees a root, so the walk starts at the
    // first bit with no empty-tree case. `number` is a double, exact for
    // integers well beyond the 32-bit range the statement promises the
    // answer fits, so the running value never risks losing precision no
    // matter how deep the walk runs before a leaf is reached.
    let total = 0;
    // Loop invariant: the stack holds [node, running] pairs where running
    // is the value formed by the bits from the root down to (but
    // excluding) `node`; appending node.val extends it by one bit.
    const stack: Array<[TreeNode, number]> = [[root!, 0]];
    while (stack.length > 0) {
        const [node, running] = stack.pop()!;
        const value = running * 2 + node.val;
        if (node.left === null && node.right === null) {
            // The path ends here, so its value is complete and joins the
            // total — the only place a value is ever summed.
            total += value;
        } else {
            // An internal node never sums on its own: its bit only matters
            // inside the values of the leaves below it.
            if (node.left !== null) stack.push([node.left, value]);
            if (node.right !== null) stack.push([node.right, value]);
        }
    }
    return total;
}
