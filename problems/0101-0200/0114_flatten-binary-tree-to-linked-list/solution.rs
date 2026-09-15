// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn flatten(mut root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        let mut node = root.as_deref_mut();
        // Loop invariant: every node already passed hangs on a single right
        // spine — the flattened pre-order prefix, all left pointers None —
        // so `node` is always the next pre-order node awaiting its splice.
        // Rust's nodes are owned Boxes, so a splice takes the children out
        // and hands them to their new parents: same relinking, no allocation.
        while let Some(current) = node {
            if let Some(mut left) = current.left.take() {
                // The rightmost node of the left subtree ends that subtree's
                // pre-order, so it is the last node visited before the old
                // right subtree: let it adopt that subtree, then swing the
                // whole left subtree across to the right. Each hunt step
                // reborrows afresh (`is_some` binds nothing), which is what
                // lets the cursor reassign itself borrow-checker-cleanly.
                let mut tail = &mut left;
                while tail.right.is_some() {
                    tail = tail.right.as_mut().unwrap();
                }
                tail.right = current.right.take();
                current.right = Some(left);
            }
            node = current.right.as_deref_mut();
        }
        root
    }
}
