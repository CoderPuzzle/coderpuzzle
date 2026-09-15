impl Solution {
    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, p: i32, q: i32) -> i32 {
        // Plain descent, no stack or parent pointers: two comparisons per
        // level decide which side both targets lie on.
        let mut node = root.as_deref();
        while let Some(n) = node {
            if p < n.val && q < n.val {
                node = n.left.as_deref();
            } else if p > n.val && q > n.val {
                node = n.right.as_deref();
            } else {
                // First node where the targets split sides (or equals one of
                // them): every strict ancestor keeps both in one subtree.
                return n.val;
            }
        }
        -1
    }
}
