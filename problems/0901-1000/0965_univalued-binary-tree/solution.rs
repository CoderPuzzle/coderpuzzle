// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::VecDeque;

impl Solution {
    // The root's value is the one every node must carry, so a single
    // reference value is all the scan needs. It reads the tree level
    // by level — a queue seeded with the root, drained front-first,
    // children appended left before right — and answers false at the
    // first node that disagrees; a queue that drains clean leaves
    // every node vouched for, which is true. The queue, not the call
    // stack, carries the walk — a hundred-node chain of one value is
    // within the constraints, and no frame ever nests.
    pub fn is_unival_tree(root: Option<Box<TreeNode>>) -> bool {
        let root = match root.as_deref() {
            Some(node) => node,
            None => return true,
        };
        let mut pending: VecDeque<&TreeNode> = VecDeque::new();
        pending.push_back(root);
        while let Some(node) = pending.pop_front() {
            if node.val != root.val {
                return false;
            }
            if let Some(child) = node.left.as_deref() {
                pending.push_back(child);
            }
            if let Some(child) = node.right.as_deref() {
                pending.push_back(child);
            }
        }
        true
    }
}
