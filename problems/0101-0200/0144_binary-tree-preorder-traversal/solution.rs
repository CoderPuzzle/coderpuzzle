impl Solution {
    pub fn preorder_traversal(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // The stack borrows from `root`, so nodes can be shared freely.
        let mut result: Vec<i32> = Vec::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(root_ref) = root.as_deref() {
            stack.push(root_ref);
        }
        // Loop invariant: `stack` holds exactly the discovered-but-unvisited
        // nodes, in the order preorder wants them next.
        while let Some(node) = stack.pop() {
            // Preorder visits a node before either of its subtrees.
            result.push(node.val);
            // Push right before left: the stack pops from the top, so the
            // left child (and its entire subtree) is traversed first.
            if let Some(right) = node.right.as_deref() {
                stack.push(right);
            }
            if let Some(left) = node.left.as_deref() {
                stack.push(left);
            }
        }
        result
    }
}
