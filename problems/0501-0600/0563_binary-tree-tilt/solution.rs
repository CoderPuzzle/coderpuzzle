// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

// A node under traversal: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to sum) plus the sums of the two subtrees
// already finished beneath it.
struct Frame {
    node: Option<Box<TreeNode>>,
    state: u8,
    left: i32,
    right: i32,
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
    pub fn find_tilt(root: Option<Box<TreeNode>>) -> i64 {
        // Post-order, one pass: by the time a node is settled, both of its
        // subtrees have reported their sums, so its tilt |left - right|
        // falls out of those two numbers — a missing child reports 0 — and
        // the same visit yields the node's own sum for its parent. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose walk would nest 10000 calls —
        // past the call stack's hold, and past the recursive drop of its
        // boxes.
        let mut total_tilt: i64 = 0;
        // Every subtree sum stays within 10^4 nodes of 1000 each, so
        // |sum| <= 10^7 fits an i32; only the running total of tilts is
        // 64-bit — a 10^4-node one-child chain of 1000s stacks up tilts
        // 0 + 1000 + 2000 + ... to almost 5 * 10^10.
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
                    let (left, right) = (frame.left, frame.right);
                    total_tilt += (left - right).abs() as i64;
                    let total = value + left + right;
                    if let Some(parent) = stack.last_mut() {
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
        total_tilt
    }
}
