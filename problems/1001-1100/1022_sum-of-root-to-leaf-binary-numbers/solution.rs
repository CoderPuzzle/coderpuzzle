impl Solution {
    pub fn sum_root_to_leaf(root: Option<Box<TreeNode>>) -> i32 {
        // The stack borrows from `root`, so nodes can be shared freely. The
        // node range [1, 1000] guarantees a root, so the walk starts at
        // the first bit: each frame is a node plus `running`, the value
        // formed by the bits from the root down to (but excluding) it —
        // appending the node's value extends that value by one bit. The
        // running value and the total are carried in i64 rather than i32:
        // nothing in the statement caps how deep a path runs before it
        // must fit the promised 32-bit answer, so a wide accumulator
        // removes any risk of intermediate overflow while a long prefix
        // is still being walked.
        let mut stack: Vec<(&TreeNode, i64)> = root.as_deref().into_iter().map(|node| (node, 0)).collect();
        let mut total: i64 = 0;
        while let Some((node, running)) = stack.pop() {
            let value = running * 2 + node.val as i64;
            if node.left.is_none() && node.right.is_none() {
                // The path ends here, so its value is complete and joins
                // the total — the only place a value is ever summed.
                total += value;
            } else {
                // An internal node never sums on its own: its bit only
                // matters inside the values of the leaves below it.
                for child in [node.left.as_deref(), node.right.as_deref()] {
                    if let Some(child) = child {
                        stack.push((child, value));
                    }
                }
            }
        }
        // The statement guarantees the answer fits a 32-bit integer.
        total as i32
    }
}
