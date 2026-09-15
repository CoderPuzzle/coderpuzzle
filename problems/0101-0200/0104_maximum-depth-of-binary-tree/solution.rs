impl Solution {
    pub fn max_depth(root: Option<Box<TreeNode>>) -> i32 {
        // The frontier borrows from `root`, so nodes can be shared freely.
        let mut depth = 0;
        let mut level: Vec<&TreeNode> = root.as_deref().into_iter().collect();
        // Loop invariant: `level` holds exactly one level's nodes, so one
        // full round of rebuilding it counts exactly one level of depth.
        while !level.is_empty() {
            depth += 1;
            // Collect only the real children, so nodes of two levels never
            // mix inside one frontier and a leaf contributes nothing.
            let mut next: Vec<&TreeNode> = Vec::new();
            for node in &level {
                if let Some(left) = node.left.as_deref() {
                    next.push(left);
                }
                if let Some(right) = node.right.as_deref() {
                    next.push(right);
                }
            }
            level = next;
        }
        depth
    }
}
