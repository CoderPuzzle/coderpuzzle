use std::collections::VecDeque;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn add_one_row(mut root: Option<Box<TreeNode>>, val: i32, depth: i32) -> Option<Box<TreeNode>> {
        if depth == 1 {
            // There is no depth 0 to splice under: the whole original tree
            // slips one level down as a fresh root's left subtree.
            let fresh = TreeNode {
                val,
                left: root,
                right: None,
            };
            return Some(Box::new(fresh));
        }
        // The insertion row sits at a fixed depth, so the work is only
        // reaching it: a frontier of &mut borrows starts at the root and
        // steps down one level per round — Some children only — until it
        // holds exactly the nodes at depth - 1, the splice points. The
        // frontier walk iterates on purpose: the tree may be a single
        // 10^4-node chain, whose recursive descent would nest 10000 calls
        // — past the call stack's hold, and past the recursive drop of its
        // boxes.
        let mut row: VecDeque<&mut TreeNode> = VecDeque::new();
        row.push_back(root.as_deref_mut().unwrap());
        for _ in 1..depth - 1 {
            let mut next: VecDeque<&mut TreeNode> = VecDeque::new();
            for node in row {
                if let Some(left) = node.left.as_deref_mut() {
                    next.push_back(left);
                }
                if let Some(right) = node.right.as_deref_mut() {
                    next.push_back(right);
                }
            }
            row = next;
        }
        for node in row {
            // Rust's nodes are owned Boxes, so re-parenting means taking the
            // old subtree out and re-hanging it, whole, inside its fresh val
            // node — one level deeper, never rebuilt.
            let old_left = node.left.take();
            node.left = Some(Box::new(TreeNode {
                val,
                left: old_left,
                right: None,
            }));
            let old_right = node.right.take();
            node.right = Some(Box::new(TreeNode {
                val,
                left: None,
                right: old_right,
            }));
        }
        root
    }
}
