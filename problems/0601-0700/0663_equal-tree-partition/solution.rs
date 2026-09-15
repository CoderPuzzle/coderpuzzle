use std::collections::HashSet;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

// A node under traversal: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to sum) plus the sums of the two subtrees
// already finished beneath it.
struct Frame {
    node: Option<Box<TreeNode>>,
    state: u8,
    left: i64,
    right: i64,
}

impl Frame {
    fn new(node: Box<TreeNode>) -> Frame {
        Frame {
            node: Some(node),
            state: 0,
            left: 0,
            right: 0,
        }
    }
}

impl Solution {
    pub fn check_equal_tree(root: Option<Box<TreeNode>>) -> bool {
        // Removing one edge detaches exactly one subtree; the two parts are
        // that subtree and everything else, so the split is equal exactly
        // when some subtree sums to half of the whole tree's total. One
        // post-order pass computes every subtree sum, and the root's own
        // sum, the last to finish, is that total. The traversal carries its
        // own stack of frames: the tree may be a single 10^4-node chain,
        // whose walk would nest 10000 calls — past the call stack's hold,
        // and past the recursive drop of its boxes.
        let mut sums: HashSet<i64> = HashSet::new();
        let mut total: i64 = 0;
        // Sums reach 10^4 nodes of 10^5 each — |sum| up to 10^9, at the
        // very rim of an i32 — so accumulation is 64-bit throughout.
        let mut stack: Vec<Frame> = Vec::new();
        if let Some(node) = root {
            stack.push(Frame::new(node));
        }
        while let Some(frame) = stack.last_mut() {
            match frame.state {
                0 => {
                    frame.state = 1;
                    let child = frame.node.as_mut().unwrap().left.take();
                    if let Some(node) = child {
                        stack.push(Frame::new(node));
                    }
                }
                1 => {
                    frame.state = 2;
                    let child = frame.node.as_mut().unwrap().right.take();
                    if let Some(node) = child {
                        stack.push(Frame::new(node));
                    }
                }
                _ => {
                    let frame = stack.pop().unwrap();
                    let value = frame.node.as_ref().unwrap().val;
                    total = value as i64 + frame.left + frame.right;
                    if let Some(parent) = stack.last_mut() {
                        // A parent still waits above, so this was a proper
                        // subtree — the only cut candidates. The whole tree
                        // never counts as a part: with total 0 the root's
                        // own sum would match its half spuriously.
                        sums.insert(total);
                        // The parent's state tells which subtree just
                        // finished: 1 = its left child, 2 = its right child.
                        if parent.state == 1 {
                            parent.left = total;
                        } else {
                            parent.right = total;
                        }
                    }
                }
            }
        }
        // An odd total never halves into integers — parity still bites
        // with negatives (-9 is as odd as 9).
        total % 2 == 0 && sums.contains(&(total / 2))
    }
}
