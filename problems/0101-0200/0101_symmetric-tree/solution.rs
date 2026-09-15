impl Solution {
    pub fn is_symmetric(root: Option<Box<TreeNode>>) -> bool {
        match root.as_deref() {
            // The empty tree is trivially symmetric: nothing can disagree.
            None => true,
            // A tree is symmetric exactly when the root's two children
            // mirror each other; `is_mirror` borrows both subtrees.
            Some(node) => is_mirror(node.left.as_deref(), node.right.as_deref()),
        }
    }
}

// Structure first, then values, then both crossed child pairs: symmetry
// lives across the center, so the OUTER pair (a.left, b.right) and INNER
// pair (a.right, b.left) must each be mirrors by these same rules.
fn is_mirror(a: Option<&TreeNode>, b: Option<&TreeNode>) -> bool {
    match (a, b) {
        // Two missing subtrees match; exactly one missing is a structural
        // mismatch — only (None, None) may return true here.
        (None, None) => true,
        (None, Some(_)) | (Some(_), None) => false,
        (Some(a), Some(b)) => {
            a.val == b.val
                && is_mirror(a.left.as_deref(), b.right.as_deref())
                && is_mirror(a.right.as_deref(), b.left.as_deref())
        }
    }
}
