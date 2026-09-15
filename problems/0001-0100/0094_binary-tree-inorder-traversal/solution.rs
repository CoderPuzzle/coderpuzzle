impl Solution {
    pub fn inorder_traversal(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // The stack borrows from `root`, so nodes can be shared freely.
        let mut result: Vec<i32> = Vec::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut node: Option<&TreeNode> = root.as_deref();
        // Loop invariant: `stack` holds the ancestors whose left subtrees
        // are still being descended into; `node` is the next subtree to
        // process (None means it is time to pop back up instead).
        while node.is_some() || !stack.is_empty() {
            // Descend the left spine, remembering every node on it.
            while let Some(current) = node {
                stack.push(current);
                node = current.left.as_deref();
            }
            // The stack top is now the leftmost unvisited node of the
            // current subtree — the next value in inorder order.
            let current = stack.pop().unwrap();
            result.push(current.val);
            // The popped node's left subtree is done; traverse its right
            // subtree in full before any ancestor below it is visited.
            node = current.right.as_deref();
        }
        result
    }
}
