// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // An inorder walk of a BST visits the values in ascending order, so the
    // closest pair in the whole tree appears as two consecutive visits —
    // any two values with a third between them sit farther apart than that
    // third sits from one of them. The walk keeps only the previously
    // visited value and folds in the smallest difference to the current one.
    pub fn min_diff_in_bst(root: Option<Box<TreeNode>>) -> i32 {
        let mut best = i32::MAX;
        let mut prev: Option<i32> = None;
        // The stack, not the call stack, drives the descent to each
        // leftmost node and the step back up — the tree may legally be a
        // single 100-node chain.
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut node = root.as_deref();
        while node.is_some() || !stack.is_empty() {
            while let Some(current) = node {
                stack.push(current);
                node = current.left.as_deref();
            }
            let current = stack.pop().unwrap();
            // At least two nodes exist, so the pair check fires before the
            // walk ends and best is always set.
            if let Some(before) = prev {
                best = best.min(current.val - before);
            }
            prev = Some(current.val);
            node = current.right.as_deref();
        }
        best
    }
}
