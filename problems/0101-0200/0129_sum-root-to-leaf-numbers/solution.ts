function sumNumbers(root: TreeNode | null): number {
    // The node range [1, 1000] guarantees a root, so the walk starts at the
    // first digit with no empty-tree case.
    let total = 0;
    // Loop invariant: the stack holds [node, prefix] pairs where prefix is
    // the number formed by the digits from the root down to (but excluding)
    // `node`; appending node.val extends it by one digit.
    const stack: Array<[TreeNode, number]> = [[root!, 0]];
    while (stack.length > 0) {
        const [node, prefix] = stack.pop()!;
        const number = prefix * 10 + node.val;
        if (node.left === null && node.right === null) {
            // The path ends here, so its number is complete and joins the
            // total — the only place a value is ever summed.
            total += number;
        } else {
            // An internal node never sums on its own: its digit only matters
            // inside the numbers of the leaves below it.
            if (node.left !== null) stack.push([node.left, number]);
            if (node.right !== null) stack.push([node.right, number]);
        }
    }
    return total;
}
