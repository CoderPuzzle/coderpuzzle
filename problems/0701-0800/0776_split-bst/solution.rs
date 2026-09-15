// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn split_bst(root: Option<Box<TreeNode>>, target: i32) -> Vec<Option<Box<TreeNode>>> {
        // The split boundary is one root-to-null path: step right whenever
        // a node's value is at most target, left whenever it is greater.
        // Only the nodes on that path ever change children — every subtree
        // hanging off it keeps its parent, which is exactly the structure
        // preservation the statement demands.
        let mut small: Option<Box<TreeNode>> = None;
        let mut large: Option<Box<TreeNode>> = None;
        // Two dangling tails mark where the next path node on each side
        // must attach. A node <= target joins the first tree, and the next
        // small-side node on the path is always its right descendant, so
        // the tail advances to its freshly emptied right child; a node
        // > target mirrors this on the left. The tree is owned, so each
        // cut is a move: a path node hands its successor over with take()
        // and the tails reborrow through the boxes as they advance.
        let mut small_tail: &mut Option<Box<TreeNode>> = &mut small;
        let mut large_tail: &mut Option<Box<TreeNode>> = &mut large;
        let mut node = root;
        while let Some(mut current) = node {
            if current.val <= target {
                node = current.right.take();
                *small_tail = Some(current);
                small_tail = &mut small_tail.as_mut().unwrap().right;
            } else {
                node = current.left.take();
                *large_tail = Some(current);
                large_tail = &mut large_tail.as_mut().unwrap().left;
            }
        }
        vec![small, large]
    }
}
