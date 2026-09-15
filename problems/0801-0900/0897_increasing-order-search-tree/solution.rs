// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn increasing_bst(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // The required tree's values, read from its root down its only
        // right links, are ascending — exactly the order an in-order walk
        // of a binary search tree visits. So the answer is that walk,
        // relinked: the leftmost node (visited first) becomes the root,
        // every left link is severed, every right link points at the next
        // visited node. Rust's nodes are owned boxes, so a node cannot be
        // relinked while it sits inside its parent: the walk consumes the
        // tree — take each box out, remember its value, hand back only
        // the right child to descend into — carrying an explicit stack of
        // deferred nodes rather than recursing.
        let mut values: Vec<i32> = Vec::new();
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let mut current = root;
        while current.is_some() || !stack.is_empty() {
            // Descend one left spine, deferring every node on it.
            while let Some(mut node) = current {
                current = node.left.take();
                stack.push(node);
            }
            // The stack top is now the leftmost unvisited node: visit it
            // and continue the walk in its right subtree.
            let mut node = stack.pop().unwrap();
            values.push(node.val);
            current = node.right.take();
        }
        // Rebuild the visit order as a spine: the last node keeps no
        // right child, and no node keeps a left child.
        let mut spine: Option<Box<TreeNode>> = None;
        for &val in values.iter().rev() {
            let mut node = TreeNode::new(val);
            node.right = spine;
            spine = Some(Box::new(node));
        }
        spine
    }
}
