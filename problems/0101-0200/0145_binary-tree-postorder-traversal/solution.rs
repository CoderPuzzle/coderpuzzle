impl Solution {
    pub fn postorder_traversal(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // The stack borrows from `root`, so nodes can be shared freely.
        let mut result: Vec<i32> = Vec::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(boxed) = root.as_deref() {
            stack.push(boxed);
        }
        // Loop invariant: `stack` holds nodes still to be expanded; each is
        // emitted the moment it is popped. Children are pushed left first,
        // so the right child is always expanded before the left one.
        while let Some(node) = stack.pop() {
            result.push(node.val);
            // Left first, right on top: the emits so far read root, right,
            // left — preorder with the two children swapped.
            if let Some(left) = node.left.as_deref() {
                stack.push(left);
            }
            if let Some(right) = node.right.as_deref() {
                stack.push(right);
            }
        }
        // Root-right-left read backwards is left-right-root: postorder.
        result.reverse();
        result
    }
}
