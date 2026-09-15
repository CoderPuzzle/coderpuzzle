// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Number the positions the way a heap numbers them — root at 1,
    // children of slot i at 2i and 2i+1. Draining the queue front-first
    // surfaces nodes in exactly slot order (absent children ride along as
    // None placeholders), so the first None drained is the first
    // unoccupied slot, and any real node after it sits beyond a hole that
    // completeness cannot afford.
    pub fn is_complete_tree(root: Option<Box<TreeNode>>) -> bool {
        let mut pending: Vec<Option<&TreeNode>> = vec![root.as_deref()];
        let mut head = 0;
        let mut gap_seen = false;
        while head < pending.len() {
            let node = pending[head];
            head += 1;
            match node {
                None => gap_seen = true,
                Some(node) => {
                    if gap_seen {
                        return false;
                    }
                    pending.push(node.left.as_deref());
                    pending.push(node.right.as_deref());
                }
            }
        }
        true
    }
}
