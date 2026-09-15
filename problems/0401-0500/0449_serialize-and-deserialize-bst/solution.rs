// Preorder with null markers: the root's value, then its left subtree, then
// its right, `x` for every absent child, joined by commas.
pub struct Codec;

impl Codec {
    pub fn new() -> Self {
        Codec
    }

    pub fn serialize(&mut self, root: Option<Box<TreeNode>>) -> String {
        let mut out = String::new();
        let mut stack: Vec<Option<&TreeNode>> = vec![root.as_deref()];
        while let Some(node) = stack.pop() {
            if !out.is_empty() {
                out.push(',');
            }
            match node {
                None => out.push('x'),
                Some(node) => {
                    out.push_str(&node.val.to_string());
                    stack.push(node.right.as_deref());
                    stack.push(node.left.as_deref());
                }
            }
        }
        out
    }

    // The mirror build: shells and preorder edges first, then the edges
    // linked in reverse so every child subtree is complete before its
    // parent adopts it — indices stand in for the references a growing
    // Vec cannot lend.
    pub fn deserialize(&mut self, data: String) -> Option<Box<TreeNode>> {
        let tokens: Vec<&str> = data.split(',').collect();
        if tokens[0] == "x" {
            return None;
        }
        let mut shells: Vec<Option<TreeNode>> = Vec::with_capacity(tokens.len());
        let mut edges: Vec<(usize, usize, bool)> = Vec::new();
        let mut open: Vec<(usize, bool)> = Vec::new();
        for (position, token) in tokens.iter().enumerate() {
            let child = if *token == "x" {
                None
            } else {
                let value: i32 = token.parse().unwrap();
                shells.push(Some(TreeNode::new(value)));
                Some(shells.len() - 1)
            };
            if position == 0 {
                open.push((child.unwrap(), true));
                continue;
            }
            let (parent, wants_left) = open.pop().unwrap();
            if wants_left {
                if let Some(node) = child {
                    edges.push((parent, node, true));
                }
                open.push((parent, false));
            } else if let Some(node) = child {
                edges.push((parent, node, false));
            }
            if let Some(node) = child {
                open.push((node, true));
            }
        }
        for (parent, child, wants_left) in edges.into_iter().rev() {
            let shell = shells[child].take().unwrap();
            if wants_left {
                shells[parent].as_mut().unwrap().left = Some(Box::new(shell));
            } else {
                shells[parent].as_mut().unwrap().right = Some(Box::new(shell));
            }
        }
        shells[0].take().map(Box::new)
    }
}
