impl Solution {
    pub fn pseudo_palindromic_paths(root: Option<Box<TreeNode>>) -> i32 {
        let root = match root {
            Some(node) => node,
            None => return 0,
        };
        let mut count = 0;
        // Explicit stack: the tree may be a chain 10^5 deep, too deep for
        // recursion under the small run-time stacks.
        let mut stack: Vec<(&TreeNode, u32)> = vec![(&root, 1u32 << (root.val - 1))];
        while let Some((node, mask)) = stack.pop() {
            if node.left.is_none() && node.right.is_none() {
                // At most one set bit <=> at most one odd digit count.
                if mask & (mask - 1) == 0 {
                    count += 1;
                }
                continue;
            }
            if let Some(left) = node.left.as_deref() {
                stack.push((left, mask ^ (1u32 << (left.val - 1))));
            }
            if let Some(right) = node.right.as_deref() {
                stack.push((right, mask ^ (1u32 << (right.val - 1))));
            }
        }
        count
    }
}
