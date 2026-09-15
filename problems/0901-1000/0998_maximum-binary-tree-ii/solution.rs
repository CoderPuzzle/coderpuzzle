// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn insert_into_max_tree(root: Option<Box<TreeNode>>, val: i32) -> Option<Box<TreeNode>> {
        // Appending val to the end of the original array can only disturb
        // the tree's right spine: every node off that spine is the max of a
        // subarray that lies entirely before the appended value, so it and
        // its whole subtree are untouched. If val beats everything on the
        // spine (including an empty tree), it becomes the new overall
        // maximum, so it is the new root with the old tree hanging as its
        // left child.
        match root {
            None => Some(Box::new(TreeNode::new(val))),
            Some(old_root) if val > old_root.val => {
                let mut node = TreeNode::new(val);
                node.left = Some(old_root);
                Some(Box::new(node))
            }
            Some(mut old_root) => {
                // Otherwise walk down the spine while it still dominates
                // val, reborrowing through a single &mut so ownership never
                // splits. The walk stops at the first spine node whose
                // right child is either absent or smaller than val —
                // exactly where val belongs: it takes over that child
                // slot, and whatever used to sit there (still all smaller
                // than val, by construction of the spine) becomes val's own
                // left subtree.
                let mut cur: &mut TreeNode = &mut old_root;
                while cur.right.as_ref().is_some_and(|right| right.val > val) {
                    cur = cur.right.as_mut().unwrap();
                }
                let mut new_node = TreeNode::new(val);
                new_node.left = cur.right.take();
                cur.right = Some(Box::new(new_node));
                Some(old_root)
            }
        }
    }
}
