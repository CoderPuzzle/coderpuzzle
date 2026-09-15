// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn count_unival_subtrees(root: Option<Box<TreeNode>>) -> i32 {
        let mut count = 0;
        Solution::is_unival(root, &mut count);
        count
    }

    // Post-order: each call reports whether the subtree rooted here is
    // uni-value; every true is one more subtree for the count. Rust's nodes
    // are owned Boxes, so each child is taken out whole into its own
    // recursive call — its value is read before the move.
    fn is_unival(root: Option<Box<TreeNode>>, count: &mut i32) -> bool {
        let mut node = match root {
            Some(node) => node,
            // The empty tree is vacuously uni-value: an absent child never
            // breaks its parent. It is never counted, so None yields 0.
            None => return true,
        };
        let value = node.val;
        let left_matches = node.left.as_deref().map_or(true, |child| child.val == value);
        let right_matches = node.right.as_deref().map_or(true, |child| child.val == value);
        // Visit both children unconditionally: counting happens inside the
        // recursion, and a skipped branch would skip its own subtrees.
        let left = Solution::is_unival(node.left.take(), count);
        let right = Solution::is_unival(node.right.take(), count);
        let uni = left && right && left_matches && right_matches;
        if uni {
            *count += 1;
        }
        uni
    }
}
