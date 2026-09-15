impl Solution {
    pub fn is_valid_bst(root: Option<Box<TreeNode>>) -> bool {
        // Preorder with an explicit stack — the same shape in every language,
        // chosen because recursion would overflow Python's call-stack limit
        // on a 10'000-node chain. Bounds are i64, not i32: node values reach
        // the int32 extremes, so the initial interval must be strictly wider
        // than any value can be.
        let mut stack: Vec<(&TreeNode, i64, i64)> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push((node, i64::MIN, i64::MAX));
        }
        while let Some((node, lo, hi)) = stack.pop() {
            // The value must lie strictly inside (lo, hi): equal keys
            // falsify a BST, so both edges are exclusive.
            let value = node.val as i64;
            if value <= lo || value >= hi {
                return false;
            }
            // Children inherit the intervals their parent carved out.
            if let Some(left) = node.left.as_deref() {
                stack.push((left, lo, value));
            }
            if let Some(right) = node.right.as_deref() {
                stack.push((right, value, hi));
            }
        }
        true
    }
}
