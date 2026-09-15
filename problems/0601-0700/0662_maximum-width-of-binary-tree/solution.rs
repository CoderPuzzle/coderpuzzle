use std::collections::VecDeque;

impl Solution {
    pub fn width_of_binary_tree(root: Option<Box<TreeNode>>) -> i32 {
        // The queue borrows from `root`, so nodes can be shared freely.
        let mut best: i64 = 0;
        let mut queue: VecDeque<(&TreeNode, i64)> = VecDeque::new();
        if let Some(start) = root.as_deref() {
            queue.push_back((start, 0));
        }
        while !queue.is_empty() {
            // The queue holds exactly one level, in index order, so its
            // end nodes' indices give the level's width directly — the
            // null slots between them are counted by the arithmetic,
            // never materialized.
            let width = queue.back().unwrap().1 - queue.front().unwrap().1 + 1;
            if width > best {
                best = width;
            }
            // Re-base before doubling: raw heap indices double per level
            // and blow past 64 bits on a deep chain. Shifted so the level
            // starts at 0, a stored index never exceeds twice the level's
            // width; a width is a difference within one level, and the
            // shift leaves every such difference unchanged.
            let base = queue.front().unwrap().1;
            let remaining = queue.len();
            for _ in 0..remaining {
                let (node, index) = queue.pop_front().unwrap();
                let index = index - base;
                if let Some(left) = node.left.as_deref() {
                    queue.push_back((left, 2 * index));
                }
                if let Some(right) = node.right.as_deref() {
                    queue.push_back((right, 2 * index + 1));
                }
            }
        }
        best as i32
    }
}
