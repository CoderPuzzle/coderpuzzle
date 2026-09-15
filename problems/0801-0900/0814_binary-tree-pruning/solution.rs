// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn prune_tree(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // A node's subtree is the node plus everything below it, so the keep
        // decision at a node needs its subtrees decided first — the walk is
        // post-order: children before the node. Owned boxes make the
        // operation explicit: pruning a subtree is handing back None,
        // keeping it is handing the box back after its children are done.
        // Depth is bounded — at most 200 nodes, so a chain nests at most
        // 201 frames, no strain on the call stack.
        fn prune(node: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
            let mut node = match node {
                Some(node) => node,
                None => return None,
            };
            node.left = prune(node.left.take());
            node.right = prune(node.right.take());
            // Keep the node exactly when it is a 1 itself or at least one
            // pruned child survives. A 0 node handed back as None takes a
            // subtree with no 1 anywhere in it with it; an all-zero tree
            // unwinds to None.
            if node.val == 1 || node.left.is_some() || node.right.is_some() {
                Some(node)
            } else {
                None
            }
        }
        prune(root)
    }
}
