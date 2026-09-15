function countGreatEnoughNodes(root: TreeNode | null, k: number): number {
    // Post-order over an explicit stack: each node yields the sorted list
    // of its subtree's min(size, k) smallest values. The pooled child
    // lists plus the node's own value are sorted and truncated, so a full
    // subtree listing is never needed. The kept list reaches length k
    // exactly when the subtree holds at least k nodes, and its last entry
    // is then the subtree's k-th smallest value counted with multiplicity:
    // the node exceeds it iff at least k actual nodes are strictly smaller
    // — duplicates of the node itself never pass.
    let great = 0;
    if (root === null) {
        return 0;
    }
    const smallest = new Map<TreeNode, number[]>();
    const stack: [TreeNode, boolean][] = [[root, false]];
    while (stack.length > 0) {
        const [node, done] = stack.pop()!;
        if (!done) {
            stack.push([node, true]);
            if (node.left !== null) {
                stack.push([node.left, false]);
            }
            if (node.right !== null) {
                stack.push([node.right, false]);
            }
            continue;
        }
        const pooled: number[] = [node.val];
        for (const child of [node.left, node.right]) {
            const part = smallest.get(child);
            if (part !== undefined) {
                pooled.push(...part);
                smallest.delete(child);
            }
        }
        pooled.sort((a, b) => a - b);
        if (pooled.length > k) {
            pooled.length = k;
        }
        smallest.set(node, pooled);
        if (pooled.length === k && node.val > pooled[k - 1]) {
            great++;
        }
    }
    return great;
}
