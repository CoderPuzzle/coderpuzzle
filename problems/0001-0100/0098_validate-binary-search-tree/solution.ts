function isValidBST(root: TreeNode | null): boolean {
    // Preorder with an explicit stack — the same shape in every language,
    // chosen because recursion would overflow Python's call-stack limit
    // on a 10'000-node chain. ±Infinity starts every bound wider than any
    // int32 value, so the extremes are ordinary values.
    const stack: [TreeNode | null, number, number][] = [[root, -Infinity, Infinity]];
    while (stack.length > 0) {
        const [node, lo, hi] = stack.pop()!;
        if (node === null) {
            // An empty subtree satisfies every bound vacuously.
            continue;
        }
        // Strict on both sides: equal keys falsify a BST.
        if (!(lo < node.val && node.val < hi)) {
            return false;
        }
        stack.push([node.left, lo, node.val]);
        stack.push([node.right, node.val, hi]);
    }
    return true;
}
