impl Solution {
    pub fn is_same_tree(p: Option<Box<TreeNode>>, q: Option<Box<TreeNode>>) -> bool {
        // One call settles one aligned pair of subtrees.
        match (p, q) {
            // Two missing subtrees match; exactly one missing is a structural
            // mismatch — no value can repair a shape difference.
            (None, None) => true,
            (None, Some(_)) | (Some(_), None) => false,
            // Both nodes exist: values must agree here, and each aligned pair
            // of child subtrees must be the same tree by these very same rules.
            (Some(p), Some(q)) => {
                p.val == q.val && Self::is_same_tree(p.left, q.left) && Self::is_same_tree(p.right, q.right)
            }
        }
    }
}
