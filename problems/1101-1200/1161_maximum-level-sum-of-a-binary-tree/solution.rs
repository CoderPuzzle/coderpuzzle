impl Solution {
    pub fn max_level_sum(root: Option<Box<TreeNode>>) -> i32 {
        let mut frontier: Vec<&TreeNode> = root.as_deref().into_iter().collect();
        let mut best_level = 1i32;
        // Level sums reach 1e9 at the constraint limits: 64-bit accumulator.
        let mut best_sum = frontier[0].val as i64;
        let mut level = 1i32;
        while !frontier.is_empty() {
            let total: i64 = frontier.iter().map(|node| node.val as i64).sum();
            // Strict > keeps the SMALLEST level on ties.
            if total > best_sum {
                best_sum = total;
                best_level = level;
            }
            let mut next: Vec<&TreeNode> = Vec::new();
            for node in &frontier {
                if let Some(left) = node.left.as_deref() {
                    next.push(left);
                }
                if let Some(right) = node.right.as_deref() {
                    next.push(right);
                }
            }
            frontier = next;
            level += 1;
        }
        best_level
    }
}
