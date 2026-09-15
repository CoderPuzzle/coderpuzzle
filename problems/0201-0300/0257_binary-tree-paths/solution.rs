// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn binary_tree_paths(root: Option<Box<TreeNode>>) -> Vec<String> {
        let mut paths: Vec<String> = Vec::new();
        // The constraints guarantee at least one node, so root is never None.
        Solution::walk(root, String::new(), &mut paths);
        paths
    }

    // Pre-order walk carrying the half-built string: each step appends
    // "->" and the child's value, and a leaf commits the whole path.
    // Rust's nodes are owned Boxes, so each child is taken out whole into
    // its own recursive call — its value is read before the move.
    fn walk(root: Option<Box<TreeNode>>, path: String, paths: &mut Vec<String>) {
        let mut node = match root {
            Some(node) => node,
            // Unreachable: walk is only ever handed a child that exists.
            None => return,
        };
        let reached = format!("{}{}", path, node.val);
        // A leaf is a node with no children — both absent. A node with
        // only one child is a pass-through, never a terminal.
        if node.left.is_none() && node.right.is_none() {
            paths.push(reached);
            return;
        }
        // Left subtree before right, so paths are emitted in the order
        // the pinned depth-first walk meets the leaves.
        let below = format!("{}->", reached);
        Solution::walk(node.left.take(), below.clone(), paths);
        Solution::walk(node.right.take(), below, paths);
    }
}
