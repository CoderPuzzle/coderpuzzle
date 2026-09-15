fn build(lo: i32, hi: i32) -> Vec<Option<Box<TreeNode>>> {
    // An empty range still offers one choice: the null subtree.
    if lo > hi {
        return vec![None];
    }
    let mut trees = Vec::new();
    for root in lo..=hi {
        let lefts = build(lo, root - 1);
        let rights = build(root + 1, hi);
        // Left choices vary slower than right choices, so the loop
        // nesting emits the trees in the order the statement pins.
        for left in &lefts {
            for right in &rights {
                let mut node = TreeNode::new(root);
                node.left = left.clone();
                node.right = right.clone();
                trees.push(Some(Box::new(node)));
            }
        }
    }
    trees
}

impl Solution {
    pub fn generate_trees(n: i32) -> Vec<Option<Box<TreeNode>>> {
        build(1, n)
    }
}
