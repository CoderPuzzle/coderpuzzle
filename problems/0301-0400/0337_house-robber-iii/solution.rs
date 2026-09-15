impl Solution {
    pub fn rob(root: Option<Box<TreeNode>>) -> i32 {
        let (rob_here, skip_here) = best(root.as_deref());
        rob_here.max(skip_here)
    }
}

// Returns (best if node is robbed, best if node is skipped); pairing
// the two values means each subtree is evaluated exactly once.
fn best(node: Option<&TreeNode>) -> (i32, i32) {
    let node = match node {
        Some(node) => node,
        None => return (0, 0),
    };
    let (left_rob, left_skip) = best(node.left.as_deref());
    let (right_rob, right_skip) = best(node.right.as_deref());
    // Robbing here forbids both children: take their skip values.
    let rob_here = node.val + left_skip + right_skip;
    // Skipping leaves each child free to do its better option.
    let skip_here = left_rob.max(left_skip) + right_rob.max(right_skip);
    (rob_here, skip_here)
}
