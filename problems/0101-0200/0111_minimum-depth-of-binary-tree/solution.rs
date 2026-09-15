impl Solution {
    pub fn min_depth(root: Option<Box<TreeNode>>) -> i32 {
        // The frontier borrows from `root`, so nodes can be shared freely.
        // Loop invariant: `frontier` holds exactly one level's nodes, and
        // every node above them is internal, so the first leaf met in
        // level order sits at the minimum depth.
        let mut depth = 0;
        let mut frontier: Vec<&TreeNode> = root.as_deref().into_iter().collect();
        while !frontier.is_empty() {
            depth += 1;
            let mut next: Vec<&TreeNode> = Vec::new();
            for node in &frontier {
                if node.left.is_none() && node.right.is_none() {
                    // A leaf at this depth ends the search: BFS never
                    // visits below the minimum depth, which is the point.
                    return depth;
                }
                if let Some(left) = node.left.as_deref() {
                    next.push(left);
                }
                if let Some(right) = node.right.as_deref() {
                    next.push(right);
                }
            }
            frontier = next;
        }
        depth
    }
}
