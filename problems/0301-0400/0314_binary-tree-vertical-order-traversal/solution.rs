use std::collections::HashMap;
use std::collections::VecDeque;

impl Solution {
    pub fn vertical_order(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // Rust's nodes are owned Boxes, so each node is taken out whole into
        // the queue; its value is read before the children are moved on.
        let root = match root {
            Some(node) => node,
            None => return Vec::new(),
        };
        // (node, column) pairs advance level by level: dequeue order is
        // top-to-bottom, and within a row left-to-right — exactly the
        // ordering the answer needs, so appending as we dequeue is enough.
        let mut columns: HashMap<i32, Vec<i32>> = HashMap::new();
        let mut pending: VecDeque<(Box<TreeNode>, i32)> = VecDeque::new();
        pending.push_back((root, 0));
        let mut leftmost = 0;
        let mut rightmost = 0;
        while let Some((node, column)) = pending.pop_front() {
            let value = node.val;
            columns.entry(column).or_default().push(value);
            leftmost = leftmost.min(column);
            rightmost = rightmost.max(column);
            if let Some(left) = node.left {
                pending.push_back((left, column - 1));
            }
            if let Some(right) = node.right {
                pending.push_back((right, column + 1));
            }
        }
        // The visited columns form one contiguous range (columns only ever
        // move by one), so the minimum-to-maximum sweep misses nothing.
        (leftmost..=rightmost)
            .map(|column| columns.remove(&column).unwrap_or_default())
            .collect()
    }
}
