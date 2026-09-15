// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Every good pair's path bends at its lowest common ancestor, so
    // counting pairs reduces to counting, at each node, how many ways a
    // leaf on one side meets a leaf on the other within budget. Postorder
    // gives each node its children's answers first: a table indexed by
    // relative depth (0..distance) counting leaves that many edges below.
    // The tree can hold up to 2^10 nodes and a skewed instance packs them
    // into one chain, so both the traversal and the merge run off explicit
    // stacks of borrowed references instead of the call stack.
    pub fn count_pairs(root: Option<Box<TreeNode>>, distance: i32) -> i32 {
        let distance = distance as usize;

        // Build the "root, right, left" visiting order with one stack;
        // reversed, that order is exactly postorder (left, right, root).
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push(node);
        }
        let mut order: Vec<&TreeNode> = Vec::new();
        while let Some(node) = stack.pop() {
            order.push(node);
            if let Some(child) = node.left.as_deref() {
                stack.push(child);
            }
            if let Some(child) = node.right.as_deref() {
                stack.push(child);
            }
        }

        let mut answer: i32 = 0;
        let mut value_stack: Vec<Vec<i32>> = Vec::new();
        for &node in order.iter().rev() {
            let has_left = node.left.is_some();
            let has_right = node.right.is_some();
            if !has_left && !has_right {
                let mut freq = vec![0i32; distance + 1];
                freq[0] = 1;
                value_stack.push(freq);
                continue;
            }

            // Postorder guarantees the right child's table (if any) was
            // pushed most recently, then the left child's.
            let right_freq = if has_right { value_stack.pop() } else { None };
            let left_freq = if has_left { value_stack.pop() } else { None };

            let mut merged = vec![0i32; distance + 1];
            if let (Some(left_freq), Some(right_freq)) = (&left_freq, &right_freq) {
                for d1 in 0..=distance {
                    let c1 = left_freq[d1];
                    if c1 == 0 || d1 + 2 > distance {
                        continue;
                    }
                    let budget = distance - d1 - 2;
                    let upper = budget.min(distance);
                    for d2 in 0..=upper {
                        let c2 = right_freq[d2];
                        if c2 != 0 {
                            answer += c1 * c2;
                        }
                    }
                }
                for d in 0..distance {
                    merged[d + 1] += left_freq[d] + right_freq[d];
                }
            } else if let Some(left_freq) = &left_freq {
                for d in 0..distance {
                    merged[d + 1] += left_freq[d];
                }
            } else if let Some(right_freq) = &right_freq {
                for d in 0..distance {
                    merged[d + 1] += right_freq[d];
                }
            }
            value_stack.push(merged);
        }

        answer
    }
}
