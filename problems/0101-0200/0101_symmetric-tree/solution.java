class Solution {

    public boolean isSymmetric(TreeNode root) {
        if (root == null) {
            // The empty tree is trivially symmetric: nothing can disagree.
            return true;
        }
        return isMirror(root.left, root.right);
    }

    // A tree is symmetric exactly when the root's two children mirror each
    // other: structure first, then values, then both crossed child pairs.
    private boolean isMirror(TreeNode a, TreeNode b) {
        // Two missing subtrees match; exactly one missing is a structural
        // mismatch — `a == b` is true only when both are null.
        if (a == null || b == null) return a == b;
        // Symmetry lives across the center: values agree here, and the
        // OUTER pair (a.left, b.right) and INNER pair (a.right, b.left)
        // must each be mirrors by these same rules.
        return a.val == b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left);
    }
}
