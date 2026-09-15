impl Solution {
    pub fn kth_smallest(root: Option<Box<TreeNode>>, k: i32) -> i32 {
        // In-order traversal of a BST visits values in ascending order, so
        // the kth visit is the kth smallest. state.0 counts down to that
        // visit; state.1 records its value.
        let mut state = (k, -1);
        // Recursion depth is bounded by the tree height h (worst case n on
        // a chain), which is why the iterative twin exists.
        Self::inorder(root.as_deref(), &mut state);
        state.1
    }

    fn inorder(node: Option<&TreeNode>, state: &mut (i32, i32)) {
        // Early stop: once the answer is recorded, the unvisited remainder
        // of the tree is never touched.
        if state.0 == 0 {
            return;
        }
        if let Some(n) = node {
            Self::inorder(n.left.as_deref(), state);
            state.0 -= 1;
            if state.0 == 0 {
                state.1 = n.val;
                return;
            }
            Self::inorder(n.right.as_deref(), state);
        }
    }
}
