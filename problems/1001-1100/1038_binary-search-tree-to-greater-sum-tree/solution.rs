impl Solution {
    pub fn bst_to_gst(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // Running sum of every value the reverse in-order has visited.
        let mut total = 0;
        Self::reverse_inorder(root, &mut total)
    }

    fn reverse_inorder(node: Option<Box<TreeNode>>, total: &mut i32) -> Option<Box<TreeNode>> {
        match node {
            None => None,
            Some(mut boxed) => {
                // Right subtree first: reversed in-order walks keys largest to smallest.
                boxed.right = Self::reverse_inorder(boxed.right.take(), total);
                // On arrival every strictly greater key is already in `total`, so
                // the overwrite yields this key plus the sum of all greater keys.
                *total += boxed.val;
                boxed.val = *total;
                // Left subtree sees the accumulated total of all larger values.
                boxed.left = Self::reverse_inorder(boxed.left.take(), total);
                Some(boxed)
            }
        }
    }
}
