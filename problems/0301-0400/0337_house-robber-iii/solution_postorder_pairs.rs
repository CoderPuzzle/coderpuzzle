impl Solution {
    pub fn rob(root: Option<Box<TreeNode>>) -> i32 {
        let (take_here, skip_here) = best(root.as_deref());
        take_here.max(skip_here)
    }
}

// Returns (best if the node is taken, best if it is skipped); pairing
// the two values means each subtree is evaluated exactly once.
fn best(node: Option<&TreeNode>) -> (i32, i32) {
    let node = match node {
        Some(node) => node,
        None => return (0, 0),
    };
    let (left_take, left_skip) = best(node.left.as_deref());
    let (right_take, right_skip) = best(node.right.as_deref());
    // Taking here forbids both children: use their skip values.
    let take_here = node.val + left_skip + right_skip;
    // Skipping leaves each child free to do its better option.
    let skip_here = left_take.max(left_skip) + right_take.max(right_skip);
    (take_here, skip_here)
}
