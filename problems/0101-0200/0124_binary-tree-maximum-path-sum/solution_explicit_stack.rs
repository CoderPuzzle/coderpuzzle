impl Solution {
    pub fn max_path_sum(root: Option<Box<TreeNode>>) -> i32 {
        let boxed = match root {
            Some(boxed) => boxed,
            None => return 0,
        };
        // Explicit post-order: frames of (node, phase) replace the call
        // stack. Phase 0 = first visit (descend left), 1 = left done
        // (descend right), 2 = both done (combine). Finished single-side
        // gains pile on their own stack, the children's results waiting for
        // the parent. Frames borrow the tree, which stays boxed and whole.
        let mut stack: Vec<(&TreeNode, u8)> = Vec::new();
        stack.push((boxed.as_ref(), 0));
        let mut gains: Vec<i64> = Vec::new();
        // A path must contain at least one node, so start at -inf, not 0.
        let mut best = i64::MIN;
        while let Some((node, phase)) = stack.pop() {
            match phase {
                0 => {
                    // Reschedule as phase 1, then let the left subtree run
                    // first by sitting on top of the stack.
                    stack.push((node, 1));
                    if let Some(left) = node.left.as_deref() {
                        stack.push((left, 0));
                    }
                }
                1 => {
                    stack.push((node, 2));
                    if let Some(right) = node.right.as_deref() {
                        stack.push((right, 0));
                    }
                }
                _ => {
                    // Both subtrees finished: right's gain sits above left's
                    // on the gain stack (left ran first). Missing children
                    // left nothing to pop.
                    let right_gain = if node.right.is_some() {
                        Some(gains.pop().unwrap())
                    } else {
                        None
                    };
                    let left_gain = if node.left.is_some() {
                        Some(gains.pop().unwrap())
                    } else {
                        None
                    };
                    // Clamp each side at 0: a negative branch is better left
                    // unvisited.
                    let down_left = left_gain.unwrap_or(0).max(0);
                    let down_right = right_gain.unwrap_or(0).max(0);
                    let value = node.val as i64;
                    // The path bending through this node is a candidate for
                    // the global answer.
                    let bend = value + down_left + down_right;
                    if bend > best {
                        best = bend;
                    }
                    // The parent may only extend the path through one side.
                    let single = down_left.max(down_right);
                    gains.push(value + single);
                }
            }
        }
        best as i32
    }
}
