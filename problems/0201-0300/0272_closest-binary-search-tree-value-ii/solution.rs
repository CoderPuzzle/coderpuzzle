// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn closest_k_values(root: Option<Box<TreeNode>>, target: f64, k: i32) -> Vec<i32> {
        // Explicit-stack inorder: the BST flattened to its sorted values, with
        // no recursion that a 10^4-node chain could overflow. The stack
        // borrows from `root`, so nodes can be shared freely.
        let mut values: Vec<i32> = Vec::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut node = root.as_deref();
        while node.is_some() || !stack.is_empty() {
            while let Some(current) = node {
                stack.push(current);
                node = current.left.as_deref();
            }
            let current = stack.pop().unwrap();
            values.push(current.val);
            node = current.right.as_deref();
        }
        // Over sorted values the distance to target is V-shaped, so the k
        // closest form one window: start at the split and grow it, each step
        // taking the nearer frontier. A tie goes left — the smaller value —
        // so the picks come out in the statement's pinned order directly.
        let n = values.len() as isize;
        let mut left = values.partition_point(|&value| (value as f64) < target) as isize - 1;
        let mut right = left + 1;
        let mut result: Vec<i32> = Vec::with_capacity(k as usize);
        for _ in 0..k {
            let take_left = right == n
                || (left >= 0
                    && (values[left as usize] as f64 - target).abs() <= (values[right as usize] as f64 - target).abs());
            if take_left {
                result.push(values[left as usize]);
                left -= 1;
            } else {
                result.push(values[right as usize]);
                right += 1;
            }
        }
        result
    }
}
