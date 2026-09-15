impl Solution {
    pub fn has_path_sum(root: Option<Box<TreeNode>>, targetSum: i32) -> bool {
        // The stack borrows from `root`, so nodes can be shared freely.
        // Loop invariant: each frame is a node plus `remaining`, the sum
        // still owed along the path from the root to it — targetSum
        // minus every value strictly above the node — so a leaf settles
        // its whole path in one compare. An empty tree collects no
        // frames at all: it has no root-to-leaf path, so no targetSum —
        // not even 0 — can be matched.
        let mut stack: Vec<(&TreeNode, i32)> = root.as_deref().into_iter().map(|node| (node, targetSum)).collect();
        while let Some((node, remaining)) = stack.pop() {
            if node.left.is_none() && node.right.is_none() {
                // The path ends here, so it qualifies exactly when the
                // leaf itself covers what is still owed.
                if remaining == node.val {
                    return true;
                }
            } else {
                // An internal node never decides: only leaves can match,
                // even when the running sum already equals targetSum.
                for child in [node.left.as_deref(), node.right.as_deref()] {
                    if let Some(child) = child {
                        stack.push((child, remaining - node.val));
                    }
                }
            }
        }
        false
    }
}
