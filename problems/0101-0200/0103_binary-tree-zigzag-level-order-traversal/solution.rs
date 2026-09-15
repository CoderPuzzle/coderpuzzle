use std::collections::VecDeque;

impl Solution {
    pub fn zigzag_level_order(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        // The queue borrows from `root`, which is sound because the walk only
        // ever descends — no node is reached from two parents.
        let mut queue: VecDeque<&TreeNode> = VecDeque::new();
        if let Some(start) = root.as_deref() {
            queue.push_back(start);
        }
        // Loop invariant: `queue` holds exactly one level's nodes, left to
        // right; `left_to_right` says which way that level is emitted.
        let mut left_to_right = true;
        while !queue.is_empty() {
            let mut level: Vec<i32> = queue.iter().map(|node| node.val).collect();
            if !left_to_right {
                // Collected left to right, so reversing yields right to left.
                level.reverse();
            }
            result.push(level);
            // Spread the next level: children enter left child first, which
            // keeps the queue ordered left to right for the round to come.
            for _ in 0..queue.len() {
                let node = queue.pop_front().unwrap();
                if let Some(child) = node.left.as_deref() {
                    queue.push_back(child);
                }
                if let Some(child) = node.right.as_deref() {
                    queue.push_back(child);
                }
            }
            left_to_right = !left_to_right;
        }
        result
    }
}
