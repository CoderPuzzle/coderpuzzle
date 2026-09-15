// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn recover_from_preorder(traversal: String) -> Option<Box<TreeNode>> {
        // Parse the string into (depth, value) pairs: a run of dashes gives
        // the depth, then a run of digits gives the value (values are
        // guaranteed positive, so no '-' ever appears inside a digit run).
        let bytes = traversal.as_bytes();
        let n = bytes.len();
        let mut i = 0;
        // Rust's tree nodes are owned Boxes, so a node that is still open
        // for children has to stay uniquely owned by this stack — it can't
        // also be linked from its own parent yet. It is only moved into its
        // parent's left/right field once nothing more can attach to it:
        // either a shallower token forces it out mid-parse, or, for the
        // nodes left on the final open path, once parsing ends.
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        while i < n {
            let mut depth = 0usize;
            while i < n && bytes[i] == b'-' {
                depth += 1;
                i += 1;
            }
            let start = i;
            while i < n && bytes[i].is_ascii_digit() {
                i += 1;
            }
            let value: i32 = traversal[start..i].parse().unwrap();
            // Close out every ancestor deeper than this node's depth,
            // handing each one to the parent now revealed above it.
            while stack.len() > depth {
                let child = stack.pop().unwrap();
                let parent = stack.last_mut().unwrap();
                if parent.left.is_none() {
                    parent.left = Some(child);
                } else {
                    parent.right = Some(child);
                }
            }
            stack.push(Box::new(TreeNode::new(value)));
        }
        // Flush the still-open path from the deepest node up to the root.
        while stack.len() > 1 {
            let child = stack.pop().unwrap();
            let parent = stack.last_mut().unwrap();
            if parent.left.is_none() {
                parent.left = Some(child);
            } else {
                parent.right = Some(child);
            }
        }
        stack.pop()
    }
}
