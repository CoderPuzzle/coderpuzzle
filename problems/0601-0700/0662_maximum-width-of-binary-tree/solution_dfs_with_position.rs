use std::collections::HashMap;

impl Solution {
    pub fn width_of_binary_tree(root: Option<Box<TreeNode>>) -> i32 {
        // The stack borrows from `root`, so nodes can be shared freely.
        let mut best: i64 = 0;
        // Depth -> (leftmost, rightmost) frame positions seen at that
        // depth — the two running extremes; the null slots between the
        // end nodes are counted by the arithmetic, never materialized.
        let mut extremes: HashMap<i32, (i64, i64)> = HashMap::new();
        // A Vec used as a stack. Popping the back, and pushing the right
        // child before the left, walks the tree root-first, left subtree
        // before right — preorder, which visits every depth in index
        // order.
        let mut stack: Vec<(&TreeNode, i32, i64)> = Vec::new();
        if let Some(start) = root.as_deref() {
            stack.push((start, 0, 0));
        }
        while let Some((node, depth, pos)) = stack.pop() {
            let span = extremes.entry(depth).or_insert((pos, pos));
            if pos < span.0 {
                span.0 = pos;
            }
            if pos > span.1 {
                span.1 = pos;
            }
            let width = span.1 - span.0 + 1;
            if width > best {
                best = width;
            }
            // Re-base before doubling: raw heap indices double per level
            // and blow past 64 bits on a deep chain. Shifted so the level
            // starts at its leftmost node, a stored index never exceeds
            // twice the level's width; a width is a difference within one
            // level, and the shift leaves every such difference unchanged.
            let rebased = pos - span.0;
            if let Some(right) = node.right.as_deref() {
                stack.push((right, depth + 1, 2 * rebased + 1));
            }
            if let Some(left) = node.left.as_deref() {
                stack.push((left, depth + 1, 2 * rebased));
            }
        }
        best as i32
    }
}
