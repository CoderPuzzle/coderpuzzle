// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn sum_of_left_leaves(root: Option<Box<TreeNode>>) -> i32 {
        Solution::collect(root, false)
    }

    // Pre-order carrying each node's side: when the walk enters a leaf it
    // already knows whether that leaf is the left child of another node, so
    // its value is settled on the spot and no parent is revisited. Rust's
    // nodes are owned Boxes, so each child is taken out whole into its own
    // recursive call.
    fn collect(node: Option<Box<TreeNode>>, is_left: bool) -> i32 {
        let current = match node {
            Some(current) => current,
            None => return 0,
        };
        // A leaf contributes only when it hangs off a parent's left. The
        // root is nobody's child, so it enters flagged as a right child.
        if current.left.is_none() && current.right.is_none() {
            return if is_left { current.val } else { 0 };
        }
        Solution::collect(current.left, true) + Solution::collect(current.right, false)
    }
}
