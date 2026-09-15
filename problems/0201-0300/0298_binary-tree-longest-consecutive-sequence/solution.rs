// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn longest_consecutive(root: Option<Box<TreeNode>>) -> i32 {
        // For every node, the consecutive run ending there is one longer
        // than its parent's run when the step is exactly +1, and 1 when it
        // is not; the answer is the maximum over all nodes. The traversal
        // carries its own stack so a single 3*10^4-node chain never strains
        // the call stack — or the recursive drop of its boxes.
        let mut best = 0;
        // Right children parked while the descent walks the left spine,
        // each with the run length already computed for it.
        let mut pending: Vec<(Option<Box<TreeNode>>, i32)> = Vec::new();
        let mut node = root;
        let mut length = 1;
        while let Some(mut current) = node {
            if length > best {
                best = length;
            }
            let value = current.val;
            let left = current.left.take();
            let right = current.right.take();
            if let Some(child) = right.as_deref() {
                // Extend into the right child, or restart the run there.
                let run = if child.val == value + 1 { length + 1 } else { 1 };
                pending.push((right, run));
            }
            if let Some(child) = left.as_deref() {
                // Descend left, extending or restarting the same way.
                length = if child.val == value + 1 { length + 1 } else { 1 };
                node = left;
            } else if let Some((next, run)) = pending.pop() {
                node = next;
                length = run;
            } else {
                node = None;
            }
        }
        best
    }
}
