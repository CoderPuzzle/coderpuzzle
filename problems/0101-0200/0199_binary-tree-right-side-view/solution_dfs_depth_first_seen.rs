impl Solution {
    pub fn right_side_view(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // Depth-first with the right child tried first: at every depth the
        // first node popped is the rightmost one there, the node the right
        // edge sees.
        let mut view: Vec<i32> = Vec::new();
        let mut stack: Vec<(&TreeNode, usize)> = Vec::new();
        if let Some(start) = root.as_deref() {
            stack.push((start, 0));
        }
        while let Some((node, depth)) = stack.pop() {
            // A depth earns its entry only on that first arrival; every
            // later node popped at the same depth sits further left.
            if depth == view.len() {
                view.push(node.val);
            }
            // Left pushed before right, so the right child pops first.
            if let Some(left) = node.left.as_deref() {
                stack.push((left, depth + 1));
            }
            if let Some(right) = node.right.as_deref() {
                stack.push((right, depth + 1));
            }
        }
        view
    }
}
