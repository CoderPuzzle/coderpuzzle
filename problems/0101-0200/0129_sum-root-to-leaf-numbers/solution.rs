impl Solution {
    pub fn sum_numbers(root: Option<Box<TreeNode>>) -> i32 {
        // The stack borrows from `root`, so nodes can be shared freely. The
        // node range [1, 1000] guarantees a root, so the walk starts at the
        // first digit: each frame is a node plus `prefix`, the number formed
        // by the digits from the root down to (but excluding) it — appending
        // the node's value extends that number by one digit.
        let mut stack: Vec<(&TreeNode, i32)> = root.as_deref().into_iter().map(|node| (node, 0)).collect();
        let mut total = 0;
        while let Some((node, prefix)) = stack.pop() {
            let number = prefix * 10 + node.val;
            if node.left.is_none() && node.right.is_none() {
                // The path ends here, so its number is complete and joins
                // the total — the only place a value is ever summed.
                total += number;
            } else {
                // An internal node never sums on its own: its digit only
                // matters inside the numbers of the leaves below it.
                for child in [node.left.as_deref(), node.right.as_deref()] {
                    if let Some(child) = child {
                        stack.push((child, number));
                    }
                }
            }
        }
        total
    }
}
