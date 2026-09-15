impl Solution {
    pub fn level_order(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // Handle the empty tree up front, before the queue exists.
        let root = match root {
            Some(boxed) => *boxed,
            None => return Vec::new(),
        };
        // The queue borrows from `root`, so nodes can be shared freely.
        let mut queue: std::collections::VecDeque<&TreeNode> = std::collections::VecDeque::new();
        queue.push_back(&root);
        let mut result: Vec<Vec<i32>> = Vec::new();
        // Loop invariant: at the top of each round the queue holds exactly
        // one level's nodes and nothing else.
        while !queue.is_empty() {
            // Snapshot the size now: children enqueued below belong to the
            // NEXT level, so draining exactly `size` nodes keeps levels
            // separated without any sentinel markers.
            let size = queue.len();
            let mut level: Vec<i32> = Vec::with_capacity(size);
            for _ in 0..size {
                let node = queue.pop_front().unwrap();
                level.push(node.val);
                // Skipping None children on enqueue keeps the invariant;
                // left-then-right order preserves reading order.
                if let Some(left) = node.left.as_deref() {
                    queue.push_back(left);
                }
                if let Some(right) = node.right.as_deref() {
                    queue.push_back(right);
                }
            }
            result.push(level);
        }
        result
    }
}
