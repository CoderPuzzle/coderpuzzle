impl Solution {
    pub fn max_path_sum(root: Option<Box<TreeNode>>) -> i32 {
        // A path must contain at least one node, so start at -inf, not 0.
        let mut best = i64::MIN;
        gain(root.as_deref(), &mut best);
        best as i32
    }
}

// Best path that starts at `node` and descends into at most one child.
fn gain(node: Option<&TreeNode>, best: &mut i64) -> i64 {
    let node = match node {
        Some(node) => node,
        None => return 0,
    };
    // Clamp each child's gain at 0: a negative branch is better left unvisited.
    let left = gain(node.left.as_deref(), best).max(0);
    let right = gain(node.right.as_deref(), best).max(0);
    let value = node.val as i64;
    // The path bending through this node is a candidate for the global answer.
    let total = value + left + right;
    if total > *best {
        *best = total;
    }
    // The parent may only extend the path through one side.
    value + left.max(right)
}
