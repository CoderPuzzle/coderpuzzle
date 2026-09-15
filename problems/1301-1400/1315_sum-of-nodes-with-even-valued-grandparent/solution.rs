impl Solution {
    pub fn sum_even_grandparent(root: Option<Box<TreeNode>>) -> i32 {
        // Each stack entry carries (node, parent value, grandparent value) so
        // the parity test needs no upward links. Explicit stack: the tree may
        // be a 10^4-node chain, beyond any recursion budget.
        const NONE: i32 = 1; // odd sentinel: contributes nothing
        let mut total = 0;
        let mut stack: Vec<(Option<Box<TreeNode>>, i32, i32)> = vec![(root, NONE, NONE)];
        while let Some((node, parent, grandparent)) = stack.pop() {
            if let Some(node) = node {
                if grandparent % 2 == 0 {
                    total += node.val;
                }
                stack.push((node.left, node.val, parent));
                stack.push((node.right, node.val, parent));
            }
        }
        total
    }
}
