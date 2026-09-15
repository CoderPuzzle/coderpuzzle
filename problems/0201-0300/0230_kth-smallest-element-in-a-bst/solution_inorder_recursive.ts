function kthSmallest(root: TreeNode | null, k: number): number {
    // In-order traversal of a BST visits values in ascending order, so the
    // kth visit is the kth smallest. k counts down over the nested calls;
    // the visit that zeroes it records the answer.
    let answer = -1;
    // Recursion depth is bounded by the tree height h (worst case n on a
    // chain), which is why the iterative twin exists.
    function visit(node: TreeNode | null): void {
        // Early stop: once the answer is recorded, the unvisited remainder
        // of the tree is never touched.
        if (node === null || k === 0) return;
        visit(node.left);
        k -= 1;
        if (k === 0) {
            answer = node.val;
            return;
        }
        visit(node.right);
    }
    visit(root);
    return answer;
}
