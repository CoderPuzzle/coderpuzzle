// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn upside_down_binary_tree(mut root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        let mut node = root.take();
        let mut parent: Option<Box<TreeNode>> = None;
        let mut sibling: Option<Box<TreeNode>> = None;
        // Loop invariant: `node` walks the original left spine, `parent` is
        // its original parent and `sibling` its original right sibling; every
        // spine node already passed is fully relinked into its flipped
        // orientation, so the loop only ever moves original children out.
        while let Some(mut current) = node {
            // Take both links out before relinking: `node` continues the
            // spine walk, `right_save` is the sibling of the next spine node.
            // Rust's nodes are owned Boxes, so the pointer writes of the
            // other languages become ownership moves — same relinking, no
            // allocation.
            node = current.left.take();
            let right_save = current.right.take();
            // The original right sibling becomes the new left child.
            current.left = sibling;
            // The original parent becomes the new right child.
            current.right = parent;
            parent = Some(current);
            sibling = right_save;
        }
        // The walk ends past the leftmost node; `parent` is that node — the
        // new root.
        parent
    }
}
