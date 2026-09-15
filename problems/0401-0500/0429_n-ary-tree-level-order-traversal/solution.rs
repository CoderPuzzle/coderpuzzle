use std::collections::VecDeque;

impl Solution {
    pub fn level_order(root: Option<Box<Node>>) -> Vec<Vec<i32>> {
        let mut levels: Vec<Vec<i32>> = Vec::new();
        let mut queue: VecDeque<Box<Node>> = VecDeque::new();
        if let Some(root) = root {
            queue.push_back(root);
        }
        while !queue.is_empty() {
            let mut values: Vec<i32> = Vec::with_capacity(queue.len());
            for _ in 0..queue.len() {
                let mut node = queue.pop_front().unwrap();
                values.push(node.val);
                for child in node.children.drain(..) {
                    if let Some(child) = child {
                        queue.push_back(child);
                    }
                }
            }
            levels.push(values);
        }
        levels
    }
}
