impl Solution {
    pub fn good_nodes(root: Option<Box<TreeNode>>) -> i32 {
        match root {
            Some(node) => dfs(&node, node.val),
            None => 0,
        }
    }
}

// max_so_far is the largest value on the current root path
fn dfs(node: &Box<TreeNode>, max_so_far: i32) -> i32 {
    let mut count = 0;
    let mut current_max = max_so_far;
    // non-strict: a value equal to the path max is still good; raising
    // current_max here means children see the true maximum of their path
    if node.val >= max_so_far {
        count = 1;
        current_max = node.val;
    }
    count
        + node.left.as_ref().map_or(0, |child| dfs(child, current_max))
        + node.right.as_ref().map_or(0, |child| dfs(child, current_max))
}
