impl Solution {
    pub fn postorder(root: Option<Box<Node>>) -> Vec<i32> {
        let mut out: Vec<i32> = Vec::new();
        let mut stack: Vec<(&Node, usize)> = match root.as_deref() {
            Some(root) => vec![(root, 0)],
            None => return out,
        };
        while let Some((node, index)) = stack.last().copied() {
            let children = node.children.iter().flatten().count();
            if index < children {
                stack.last_mut().unwrap().1 += 1;
                let child = node.children.iter().flatten().nth(index).unwrap();
                stack.push((child, 0));
            } else {
                out.push(node.val);
                stack.pop();
            }
        }
        out
    }
}
