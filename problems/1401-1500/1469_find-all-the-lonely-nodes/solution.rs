impl Solution {
    pub fn get_lonely_nodes(root: Option<Box<TreeNode>>) -> Vec<i32> {
        let root = match root {
            Some(node) => node,
            None => return Vec::new(),
        };
        let mut result = Vec::new();
        // Explicit stack: a 1000-deep chain must not recurse.
        let mut stack: Vec<&TreeNode> = vec![&root];
        while let Some(node) = stack.pop() {
            match (node.left.as_deref(), node.right.as_deref()) {
                (Some(left), None) => result.push(left.val),
                (None, Some(right)) => result.push(right.val),
                _ => {}
            }
            if let Some(left) = node.left.as_deref() {
                stack.push(left);
            }
            if let Some(right) = node.right.as_deref() {
                stack.push(right);
            }
        }
        result
    }
}
