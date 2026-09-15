use std::collections::VecDeque;

impl Solution {
    pub fn largest_values(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // The queue borrows from `root`, so nodes can be shared freely.
        let mut largest: Vec<i32> = Vec::new();
        let mut queue: VecDeque<&TreeNode> = VecDeque::new();
        if let Some(start) = root.as_deref() {
            queue.push_back(start);
        }
        while !queue.is_empty() {
            // One round drains exactly one level: the nodes sitting in the
            // queue when the round starts. A level always holds at least one
            // node, so its first value seeds the running maximum — no
            // sentinel, which matters when a whole row sits at i32::MIN.
            let mut best = queue.front().unwrap().val;
            let remaining = queue.len();
            for _ in 0..remaining {
                let node = queue.pop_front().unwrap();
                if node.val > best {
                    best = node.val;
                }
                if let Some(left) = node.left.as_deref() {
                    queue.push_back(left);
                }
                if let Some(right) = node.right.as_deref() {
                    queue.push_back(right);
                }
            }
            largest.push(best);
        }
        largest
    }
}
