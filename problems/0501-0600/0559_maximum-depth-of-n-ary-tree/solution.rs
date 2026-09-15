impl Solution {
    pub fn max_depth(root: Option<Box<Node>>) -> i32 {
        let mut depth = 0;
        let mut level: Vec<Box<Node>> = match root {
            Some(root) => vec![root],
            None => return 0,
        };
        while !level.is_empty() {
            depth += 1;
            let mut next: Vec<Box<Node>> = Vec::new();
            for mut node in level.into_iter() {
                for child in node.children.drain(..) {
                    if let Some(child) = child {
                        next.push(child);
                    }
                }
            }
            level = next;
        }
        depth
    }
}
