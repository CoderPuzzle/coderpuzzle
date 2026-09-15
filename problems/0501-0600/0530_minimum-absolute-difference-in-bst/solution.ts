function getMinimumDifference(root: TreeNode | null): number {
    // An inorder walk of a BST emits values in ascending order, and a
    // sorted sequence keeps its closest pair next to each other: for any
    // two values with a third between them, that middle value is closer to
    // one end than the outer pair is wide. The minimum absolute difference
    // is therefore always a gap between consecutively visited values, and
    // one pass holding just the previously emitted value sees every
    // candidate. The traversal carries its own stack of nodes: the tree may
    // be a single 10^4-node chain, whose walk would nest 10000 calls — over
    // the 512k V8 stack this judge runs Node with — so every runtime
    // iterates instead.
    let best: number | null = null;
    let prev: number | null = null;
    const stack: TreeNode[] = [];
    let current = root;
    while (current !== null || stack.length > 0) {
        // Descend the left spine stacking every node, then visit each
        // popped node and descend its right child.
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop()!;
        if (prev !== null) {
            const gap = current.val - prev;
            if (best === null || gap < best) {
                best = gap;
            }
        }
        prev = current.val;
        current = current.right;
    }
    return best!;
}
