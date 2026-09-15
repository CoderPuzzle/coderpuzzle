// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn boundary_of_binary_tree(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // The tree holds at least one node, so the root always exists.
        let root = match root {
            Some(node) => node,
            None => return Vec::new(),
        };
        let is_leaf = |node: &TreeNode| node.left.is_none() && node.right.is_none();
        // Rust's nodes are owned Boxes; the three sweeps only read each
        // node, so borrowed cursors walk the tree without moving it.
        let mut boundary = vec![root.val];

        // Left boundary: start at the root's left child and keep descending,
        // left child when present and otherwise the right child, stopping
        // before any leaf — the leftmost leaf prints in the leaves alone.
        let mut cursor = root.left.as_deref();
        while let Some(node) = cursor {
            if is_leaf(node) {
                break;
            }
            boundary.push(node.val);
            cursor = node.left.as_deref().or(node.right.as_deref());
        }

        // Leaves left to right: an explicit-stack pre-order seeded with the
        // root's children (the root is never a leaf here, and being skipped
        // at the seed it cannot print twice), right child pushed first so
        // pops run left to right. The stack replaces recursion, so a
        // 10^4-deep chain costs no call stack.
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(child) = root.right.as_deref() {
            stack.push(child);
        }
        if let Some(child) = root.left.as_deref() {
            stack.push(child);
        }
        while let Some(node) = stack.pop() {
            if is_leaf(node) {
                boundary.push(node.val);
                continue;
            }
            if let Some(child) = node.right.as_deref() {
                stack.push(child);
            }
            if let Some(child) = node.left.as_deref() {
                stack.push(child);
            }
        }

        // Right boundary: the mirror walk from the root's right child —
        // right child preferred, stopped before its leaf — collected on the
        // way down and emitted reversed.
        let mut right: Vec<i32> = Vec::new();
        let mut cursor = root.right.as_deref();
        while let Some(node) = cursor {
            if is_leaf(node) {
                break;
            }
            right.push(node.val);
            cursor = node.right.as_deref().or(node.left.as_deref());
        }
        boundary.extend(right.into_iter().rev());
        boundary
    }
}
