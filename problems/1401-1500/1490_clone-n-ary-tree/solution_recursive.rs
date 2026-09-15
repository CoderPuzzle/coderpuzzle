impl Solution {
    pub fn clone_tree(root: Option<Box<Node>>) -> Option<Box<Node>> {
        root.map(|node| {
            Box::new(Node {
                val: node.val,
                children: node.children.into_iter().map(Self::clone_tree).collect(),
            })
        })
    }
}
