use std::collections::VecDeque;

impl Solution {
    pub fn level_order_bottom(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // The queue borrows from `root`, so nodes can be shared freely.
        let mut levels: Vec<Vec<i32>> = Vec::new();
        let mut queue: VecDeque<&TreeNode> = VecDeque::new();
        if let Some(start) = root.as_deref() {
            queue.push_back(start);
        }
        while !queue.is_empty() {
            // One round of the outer loop consumes exactly one level: the
            // nodes sitting in the queue when the round starts.
            let remaining = queue.len();
            let mut level: Vec<i32> = Vec::with_capacity(remaining);
            for _ in 0..remaining {
                let node = queue.pop_front().unwrap();
                level.push(node.val);
                if let Some(left) = node.left.as_deref() {
                    queue.push_back(left);
                }
                if let Some(right) = node.right.as_deref() {
                    queue.push_back(right);
                }
            }
            levels.push(level);
        }
        // Levels were collected root-first; the statement wants leaf-first.
        levels.reverse();
        levels
    }
}
