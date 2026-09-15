// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::VecDeque;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Box<TreeNode>>) -> i32 {
        // The tree holds at least one node, so the root always exists.
        let root = match root {
            Some(node) => node,
            None => return 0,
        };
        // Children enter right-first, so every row drains right-to-left and
        // the last node dequeued overall is the leftmost node of the deepest
        // row: each dequeue overwrites the answer and the final row wins.
        // Rust's nodes are owned Boxes, so each child is taken out whole.
        let mut answer = root.val;
        let mut pending: VecDeque<Box<TreeNode>> = VecDeque::new();
        pending.push_back(root);
        while let Some(node) = pending.pop_front() {
            answer = node.val;
            if let Some(right) = node.right {
                pending.push_back(right);
            }
            if let Some(left) = node.left {
                pending.push_back(left);
            }
        }
        answer
    }
}
