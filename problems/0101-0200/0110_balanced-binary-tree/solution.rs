use std::collections::VecDeque;

impl Solution {
    pub fn is_balanced(root: Option<Box<TreeNode>>) -> bool {
        let root = match root.as_deref() {
            None => return true,
            Some(node) => node,
        };
        // Bottom-up height check: `heights` holds each node's subtree
        // height, or -1 once an imbalance is found anywhere inside it.
        // The common TreeNode is not Hash, so instead of a node-keyed map
        // the walk numbers nodes in breadth-first order and indexes a Vec:
        // BFS numbers every child after its parent, so one reverse scan
        // settles both children before the parent that reads them — no
        // recursion, so a 5000-node skewed chain cannot overflow any
        // call stack either.
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut links: Vec<(i32, i32)> = Vec::new(); // children indices, -1 = absent
        let mut queue: VecDeque<usize> = VecDeque::new();
        order.push(root);
        links.push((-1, -1));
        queue.push_back(0);
        while let Some(i) = queue.pop_front() {
            let node = order[i];
            let (mut left_idx, mut right_idx) = (-1, -1);
            if let Some(child) = node.left.as_deref() {
                left_idx = order.len() as i32;
                order.push(child);
                links.push((-1, -1));
                queue.push_back(left_idx as usize);
            }
            if let Some(child) = node.right.as_deref() {
                right_idx = order.len() as i32;
                order.push(child);
                links.push((-1, -1));
                queue.push_back(right_idx as usize);
            }
            links[i] = (left_idx, right_idx);
        }
        let mut heights = vec![0; order.len()];
        for i in (0..order.len()).rev() {
            let (left_idx, right_idx) = links[i];
            let left_height: i32 = if left_idx < 0 { 0 } else { heights[left_idx as usize] };
            let right_height: i32 = if right_idx < 0 { 0 } else { heights[right_idx as usize] };
            // -1 propagates: a subtree that contains an imbalance can
            // never regain balance higher up, so it fails every ancestor.
            if left_height == -1 || right_height == -1 || (left_height - right_height).abs() > 1 {
                heights[i] = -1;
            } else {
                heights[i] = 1 + left_height.max(right_height);
            }
        }
        heights[0] != -1
    }
}
