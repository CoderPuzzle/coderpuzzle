impl Solution {
    pub fn serialize(root: Option<Box<Node>>) -> String {
        let root = match root {
            Some(root) => root,
            None => return "[]".to_string(),
        };
        let mut tokens: Vec<String> = vec![root.val.to_string(), "null".to_string()];
        let mut queue: std::collections::VecDeque<&Node> = std::collections::VecDeque::new();
        queue.push_back(&root);
        while let Some(node) = queue.pop_front() {
            for child in node.children.iter().flatten() {
                tokens.push(child.val.to_string());
                queue.push_back(child);
            }
            tokens.push("null".to_string());
        }
        while tokens.last().map_or(false, |token| token == "null") {
            tokens.pop();
        }
        format!("[{}]", tokens.join(","))
    }
}
