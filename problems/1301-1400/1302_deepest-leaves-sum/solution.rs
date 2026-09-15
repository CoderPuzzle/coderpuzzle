// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::VecDeque;

impl Solution {
    pub fn deepest_leaves_sum(root: Option<Box<TreeNode>>) -> i32 {
        // Level-order sweep: level_sum is overwritten at every level, so when
        // the queue finally empties it holds exactly the deepest leaves' sum.
        let mut queue = VecDeque::new();
        if let Some(node) = root {
            queue.push_back(node);
        }
        let mut level_sum = 0;
        while !queue.is_empty() {
            level_sum = 0;
            for _ in 0..queue.len() {
                let node = queue.pop_front().unwrap();
                level_sum += node.val;
                if let Some(left) = node.left {
                    queue.push_back(left);
                }
                if let Some(right) = node.right {
                    queue.push_back(right);
                }
            }
        }
        level_sum
    }
}
