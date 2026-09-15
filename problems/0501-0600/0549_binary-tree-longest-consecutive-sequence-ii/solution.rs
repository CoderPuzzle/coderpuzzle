// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

// The runs topping out at a node — the longest +1-downward and the
// longest -1-downward — together with that node's value (the value rides
// along because the child's ownership moves down into its own frame).
#[derive(Clone, Copy)]
struct Run {
    inc: i32,
    dec: i32,
    val: i32,
}

// An absent child is a run of length 0; a real run always has
// inc >= 1, so the 0 flags it.
const EMPTY: Run = Run { inc: 0, dec: 0, val: 0 };

// A node under judgement: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to judge) plus the child runs collected.
struct Frame {
    node: Option<Box<TreeNode>>,
    state: u8,
    left: Run,
    right: Run,
}

impl Frame {
    fn new(node: Box<TreeNode>) -> Frame {
        Frame {
            node: Some(node),
            state: 0,
            left: EMPTY,
            right: EMPTY,
        }
    }
}

impl Solution {
    pub fn longest_consecutive(root: Option<Box<TreeNode>>) -> i32 {
        // Post-order, one pass: every node reports the pair of runs that
        // top out at it — the longest whose values step +1 downward away
        // from the node (inc) and the longest stepping -1 (dec). A child
        // valued exactly node.val + 1 extends inc with its own inc, one
        // valued node.val - 1 extends dec, and any other child extends
        // nothing. A valid path is monotone, so it turns at exactly one
        // node — the topmost node of the path, one arm descending into
        // each child subtree — and its length there is inc + dec - 1;
        // the answer is the maximum of that over all nodes. The
        // traversal carries its own stack of frames: the tree may be a
        // single 3*10^4-node chain, whose pass nests 30000 calls — past
        // the call stack's hold, and past the recursive drop of its
        // boxes.
        let mut best = 0;
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
                    let node = frame.node.unwrap();
                    let (left, right) = (frame.left, frame.right);
                    let value = node.val;
                    let mut inc = 1;
                    let mut dec = 1;
                    for child in [left, right] {
                        // The child's value picks the run it extends;
                        // its report says by how much.
                        if child.inc > 0 {
                            if child.val == value + 1 && child.inc + 1 > inc {
                                inc = child.inc + 1;
                            }
                            if child.val == value - 1 && child.dec + 1 > dec {
                                dec = child.dec + 1;
                            }
                        }
                    }
                    if inc + dec - 1 > best {
                        best = inc + dec - 1;
                    }
                    let report = Run { inc, dec, val: value };
                    if let Some(parent) = stack.last_mut() {
                        if parent.state == 1 {
                            parent.left = report;
                        } else {
                            parent.right = report;
                        }
                    }
                }
            }
        }
        best
    }
}
