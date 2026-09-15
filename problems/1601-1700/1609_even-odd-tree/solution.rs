use std::collections::VecDeque;

impl Solution {
    pub fn is_even_odd_tree(root: Option<Box<TreeNode>>) -> bool {
        let root = match root {
            Some(r) => r,
            None => return true,
        };
        let mut level = 0usize;
        let mut queue: VecDeque<TreeNode> = VecDeque::new();
        queue.push_back(*root);
        while !queue.is_empty() {
            let size = queue.len();
            let mut prev: Option<i32> = None;
            for _ in 0..size {
                let node = queue.pop_front().unwrap();
                if level % 2 == 0 {
                    if node.val % 2 == 0 || prev.is_some_and(|p| node.val <= p) {
                        return false;
                    }
                } else {
                    if node.val % 2 != 0 || prev.is_some_and(|p| node.val >= p) {
                        return false;
                    }
                }
                prev = Some(node.val);
                if let Some(l) = node.left {
                    queue.push_back(*l);
                }
                if let Some(r) = node.right {
                    queue.push_back(*r);
                }
            }
            level += 1;
        }
        true
    }
}
