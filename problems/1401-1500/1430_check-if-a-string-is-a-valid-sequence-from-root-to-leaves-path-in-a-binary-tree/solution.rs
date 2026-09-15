impl Solution {
    pub fn is_valid_sequence(root: Option<Box<TreeNode>>, arr: Vec<i32>) -> bool {
        let root = match root {
            Some(node) => node,
            None => return false,
        };
        let n = arr.len();
        // Explicit stack of (node, index): a chain thousands deep must not
        // recurse, so the walk keeps its own frame list.
        let mut stack: Vec<(&TreeNode, usize)> = vec![(&root, 0)];
        while let Some((node, i)) = stack.pop() {
            if node.val != arr[i] {
                continue;
            }
            if i == n - 1 {
                // The array is consumed: valid only at a leaf.
                if node.left.is_none() && node.right.is_none() {
                    return true;
                }
                continue;
            }
            if let Some(left) = node.left.as_deref() {
                stack.push((left, i + 1));
            }
            if let Some(right) = node.right.as_deref() {
                stack.push((right, i + 1));
            }
        }
        false
    }
}
