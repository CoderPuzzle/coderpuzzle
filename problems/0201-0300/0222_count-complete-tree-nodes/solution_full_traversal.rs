impl Solution {
    pub fn count_nodes(root: Option<Box<TreeNode>>) -> i32 {
        // Count every node the plain way: run down each left spine, then
        // pop back for the right turns. The stack holds one node per level.
        let mut count = 0;
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut node = root.as_deref();
        while node.is_some() || !stack.is_empty() {
            while let Some(current) = node {
                count += 1;
                stack.push(current);
                node = current.left.as_deref();
            }
            node = stack.pop().and_then(|popped| popped.right.as_deref());
        }
        count
    }
}
