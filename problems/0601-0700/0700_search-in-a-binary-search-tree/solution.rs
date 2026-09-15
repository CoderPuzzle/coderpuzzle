// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn search_bst(root: Option<Box<TreeNode>>, val: i32) -> Option<Box<TreeNode>> {
        // A BST orders the search path itself: every value in a node's left
        // subtree is below the node's value, every value in its right subtree
        // above it, so one comparison per node settles which side — if
        // either — can still hold val. Walk that one path: left while val is
        // smaller, right while it is larger, stop at equality — the node and
        // everything under it are exactly the subtree to return — or at a
        // None child, which proves val is absent (the empty tree on the
        // wire). The walk is a loop, not recursion: a 5000-node tree may be
        // a single chain, whose 5000 nested calls would sit needlessly on
        // the call stack.
        //
        // Rust's nodes are owned boxes, so descending means moving: each
        // step takes the child the order points to out of its parent, and
        // the rejected node — with its other, now-unreachable subtree —
        // drops at the end of the step. The found node is returned in its
        // original allocation, children untouched.
        let mut node = root;
        while let Some(mut subtree) = node {
            if subtree.val == val {
                return Some(subtree);
            }
            node = if subtree.val > val {
                subtree.left.take()
            } else {
                subtree.right.take()
            };
        }
        None
    }
}
