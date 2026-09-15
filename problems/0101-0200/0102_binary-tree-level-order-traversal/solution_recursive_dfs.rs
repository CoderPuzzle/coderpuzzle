impl Solution {
    pub fn level_order(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // One list per depth, appended to the first time the walk reaches
        // that depth; afterwards it already exists for every later arrival.
        let mut grouped: Vec<Vec<i32>> = Vec::new();
        // Pre-order: record the value before descending, so arrivals at
        // each depth happen left to right.
        fn visit(node: &TreeNode, depth: usize, grouped: &mut Vec<Vec<i32>>) {
            if grouped.len() == depth {
                grouped.push(Vec::new());
            }
            grouped[depth].push(node.val);
            if let Some(left) = node.left.as_deref() {
                visit(left, depth + 1, grouped);
            }
            if let Some(right) = node.right.as_deref() {
                visit(right, depth + 1, grouped);
            }
        }
        // An empty tree simply never starts the walk.
        if let Some(boxed) = root.as_deref() {
            visit(boxed, 0, &mut grouped);
        }
        grouped
    }
}
