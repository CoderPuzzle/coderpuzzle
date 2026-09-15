impl Solution {
    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, p: i32, q: i32) -> i32 {
        find(root.as_deref(), p, q).unwrap().val
    }
}

// find answers a narrower question per subtree: does it hold p or q?
// It returns the found target node itself, or None if neither is there.
fn find(node: Option<&TreeNode>, p: i32, q: i32) -> Option<&TreeNode> {
    let node = node?;
    // A node counts as a descendant of itself, so a value match is
    // itself a successful find and we return immediately.
    if node.val == p || node.val == q {
        return Some(node);
    }
    let left = find(node.left.as_deref(), p, q);
    let right = find(node.right.as_deref(), p, q);
    // Each side found a target: they meet at this node for the first
    // time — everything below saw at most one — so this is the answer.
    if left.is_some() && right.is_some() {
        return Some(node);
    }
    // Otherwise propagate the lone sighting upward.
    left.or(right)
}
