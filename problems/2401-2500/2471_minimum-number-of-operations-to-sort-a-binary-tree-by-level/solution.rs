use std::collections::HashMap;
use std::collections::VecDeque;

impl Solution {
    pub fn minimum_operations(root: Option<Box<TreeNode>>) -> i32 {
        let root = match root {
            Some(r) => r,
            None => return 0,
        };
        let mut total = 0i32;
        let mut queue: VecDeque<TreeNode> = VecDeque::new();
        queue.push_back(*root);
        while !queue.is_empty() {
            let size = queue.len();
            let mut level: Vec<i32> = Vec::with_capacity(size);
            for _ in 0..size {
                let node = queue.pop_front().unwrap();
                level.push(node.val);
                if let Some(l) = node.left {
                    queue.push_back(*l);
                }
                if let Some(r) = node.right {
                    queue.push_back(*r);
                }
            }
            // Minimum swaps to sort this level = sum of (cycle length - 1).
            let mut target = level.clone();
            target.sort_unstable();
            let mut pos: HashMap<i32, usize> = HashMap::with_capacity(level.len());
            for (i, &v) in level.iter().enumerate() {
                pos.insert(v, i);
            }
            let mut visited = vec![false; level.len()];
            for i in 0..level.len() {
                if visited[i] || level[i] == target[i] {
                    visited[i] = true;
                    continue;
                }
                let mut j = i;
                let mut cycle = 0i32;
                while !visited[j] {
                    visited[j] = true;
                    cycle += 1;
                    j = pos[&target[j]];
                }
                total += cycle - 1;
            }
        }
        total
    }
}
