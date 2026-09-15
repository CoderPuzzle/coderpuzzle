function isSymmetric(root: TreeNode | null): boolean {
    if (root === null) {
        // The empty tree is trivially symmetric: nothing can disagree.
        return true;
    }
    const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
        // Two missing subtrees match; exactly one missing is a structural
        // mismatch — a === b only when both are null.
        if (a === null || b === null) return a === b;
        // Symmetry lives across the center: values agree here, and the
        // OUTER pair (a.left, b.right) and INNER pair (a.right, b.left)
        // must each be mirrors by these same rules.
        return a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
    };
    return mirror(root.left, root.right);
}
