// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn max_ancestor_diff(root: Option<Box<TreeNode>>) -> i32 {
        // The stack borrows from `root`, so nodes can be shared freely.
        // Loop invariant: each frame is a node plus the minimum and maximum
        // values seen among its strict ancestors — the node's own value is
        // not folded in yet.
        let root = root.as_deref().unwrap();
        let mut stack: Vec<(&TreeNode, i32, i32)> = vec![(root, root.val, root.val)];
        let mut ans = 0;
        while let Some((node, path_min, path_max)) = stack.pop() {
            // The best pairing for this node always uses one of the two
            // running extremes above it: any other ancestor value lies
            // between path_min and path_max, so it can never beat both.
            ans = ans.max((node.val - path_min).abs()).max((node.val - path_max).abs());
            let new_min = path_min.min(node.val);
            let new_max = path_max.max(node.val);
            for child in [node.left.as_deref(), node.right.as_deref()] {
                if let Some(child) = child {
                    stack.push((child, new_min, new_max));
                }
            }
        }
        ans
    }
}
