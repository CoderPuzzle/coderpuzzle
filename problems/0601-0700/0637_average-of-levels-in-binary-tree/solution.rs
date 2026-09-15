use std::collections::VecDeque;

impl Solution {
    pub fn average_of_levels(root: Option<Box<TreeNode>>) -> Vec<f64> {
        // The queue borrows from `root`, so nodes can be shared freely.
        let mut averages: Vec<f64> = Vec::new();
        let mut queue: VecDeque<&TreeNode> = VecDeque::new();
        if let Some(start) = root.as_deref() {
            queue.push_back(start);
        }
        while !queue.is_empty() {
            // One round drains exactly one level: the nodes sitting in the
            // queue when the round starts. Children appended during the
            // round belong to the next level, and the count is fixed up
            // front. The sum runs in i64 — 10^4 values of magnitude 2^31
            // stay far inside it — so the only rounding anywhere is the
            // single division that closes the round.
            let mut total: i64 = 0;
            let remaining = queue.len();
            for _ in 0..remaining {
                let node = queue.pop_front().unwrap();
                total += node.val as i64;
                if let Some(left) = node.left.as_deref() {
                    queue.push_back(left);
                }
                if let Some(right) = node.right.as_deref() {
                    queue.push_back(right);
                }
            }
            averages.push(total as f64 / remaining as f64);
        }
        averages
    }
}
