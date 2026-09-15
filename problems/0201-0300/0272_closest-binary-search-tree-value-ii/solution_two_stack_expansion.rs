// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn closest_k_values(root: Option<Box<TreeNode>>, target: f64, k: i32) -> Vec<i32> {
        // One descent from the root sorts the tree around target. A node at
        // or below target is a candidate predecessor and anything nearer to
        // target on that side lives in its right subtree, so the walk steps
        // right after pushing it; a node above target mirrors onto the
        // successor stack and steps left. Each stack ends with its side's
        // nearest value on top, the rest of the side ordered underneath.
        // The stacks borrow from `root`, so nodes can be shared freely.
        let mut predecessors: Vec<&TreeNode> = Vec::new();
        let mut successors: Vec<&TreeNode> = Vec::new();
        let mut node = root.as_deref();
        while let Some(current) = node {
            if (current.val as f64) <= target {
                predecessors.push(current);
                node = current.right.as_deref();
            } else {
                successors.push(current);
                node = current.left.as_deref();
            }
        }
        // Each pick pops the nearer top — a tie goes to the predecessor,
        // which holds the smaller value — then restores its stack by pushing
        // the popped node's inner spine: the right edge of a predecessor's
        // left subtree, the left edge of a successor's right subtree. Each
        // side sweeps outward from target one value at a time, so picks come
        // out ordered exactly as the statement pins them.
        let mut result: Vec<i32> = Vec::with_capacity(k as usize);
        for _ in 0..k {
            let take_predecessor = match (predecessors.last(), successors.last()) {
                // Both stacks empty would mean k > n; the input rules it out.
                (None, _) => false,
                (Some(_), None) => true,
                (Some(p), Some(s)) => (p.val as f64 - target).abs() <= (s.val as f64 - target).abs(),
            };
            if take_predecessor {
                let picked = predecessors.pop().unwrap();
                result.push(picked.val);
                let mut child = picked.left.as_deref();
                while let Some(spine) = child {
                    predecessors.push(spine);
                    child = spine.right.as_deref();
                }
            } else {
                let picked = successors.pop().unwrap();
                result.push(picked.val);
                let mut child = picked.right.as_deref();
                while let Some(spine) = child {
                    successors.push(spine);
                    child = spine.left.as_deref();
                }
            }
        }
        result
    }
}
