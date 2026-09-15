impl Solution {
    fn depth(mut node: Option<&TreeNode>, left: bool) -> i32 {
        // Walk one spine (all-left or all-right) to measure its depth.
        let mut d = 0;
        while let Some(n) = node {
            d += 1;
            node = if left { n.left.as_deref() } else { n.right.as_deref() };
        }
        d
    }

    fn count(root: Option<&TreeNode>) -> i32 {
        let root = match root {
            Some(r) => r,
            None => return 0,
        };
        // Probe both spine depths from the root (child spine + 1 for root).
        let left_depth = Self::depth(root.left.as_deref(), true) + 1;
        let right_depth = Self::depth(root.right.as_deref(), false) + 1;
        // Equal spine depths => the subtree is perfect: count it in closed
        // form, 2^d - 1, with no per-node traversal.
        if left_depth == right_depth {
            return (1i64 << left_depth) as i32 - 1;
        }
        // Ragged bottom: the missing nodes sit against the right side, so at
        // least one child is itself perfect and only the other recurses.
        1 + Self::count(root.left.as_deref()) + Self::count(root.right.as_deref())
    }

    pub fn count_nodes(root: Option<Box<TreeNode>>) -> i32 {
        Self::count(root.as_deref())
    }
}
