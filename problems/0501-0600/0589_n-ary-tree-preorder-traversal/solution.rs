impl Solution {
    pub fn preorder(root: Option<Box<Node>>) -> Vec<i32> {
        let mut out: Vec<i32> = Vec::new();
        let mut stack: Vec<&Node> = match root.as_deref() {
            Some(root) => vec![root],
            None => return out,
        };
        while let Some(node) = stack.pop() {
            out.push(node.val);
            for child in node.children.iter().flatten().rev() {
                stack.push(child);
            }
        }
        out
    }
}
