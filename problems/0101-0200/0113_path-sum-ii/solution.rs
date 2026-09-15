impl Solution {
    pub fn path_sum(root: Option<Box<TreeNode>>, target_sum: i32) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        let root = match root.as_deref() {
            None => return result, // the empty tree has no root-to-leaf paths
            Some(node) => node,
        };
        // `path` is one shared buffer: every accepted path is a copy, and the
        // walk truncates the buffer back instead of rebuilding it per node.
        let mut path: Vec<i32> = Vec::new();
        // Preorder with an explicit stack — the same shape in every language,
        // chosen because recursion would overflow Python's call-stack limit
        // on a 5000-node chain. Each entry carries the node, the remaining
        // sum before paying for it, and the buffer length on entry: popping
        // the entry later truncates `path` to that prefix, which is exactly
        // the backtracking a recursive call stack would have performed.
        // The stack borrows from `root`, which is sound because the walk only
        // ever descends — no node is reached from two parents.
        let mut stack: Vec<(&TreeNode, i32, usize)> = Vec::new();
        stack.push((root, target_sum, 0));
        while let Some((node, remaining, depth)) = stack.pop() {
            path.truncate(depth);
            path.push(node.val);
            let remaining = remaining - node.val;
            if node.left.is_none() && node.right.is_none() {
                if remaining == 0 {
                    // A leaf whose root-to-leaf sum is on target: record a
                    // copy, since `path` keeps mutating after this point.
                    result.push(path.clone());
                }
                continue;
            }
            // Push the right child first so the left subtree is popped first:
            // matching paths are discovered in preorder, left to right.
            if let Some(child) = node.right.as_deref() {
                stack.push((child, remaining, depth + 1));
            }
            if let Some(child) = node.left.as_deref() {
                stack.push((child, remaining, depth + 1));
            }
        }
        result
    }
}
