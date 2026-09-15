// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

// A subtree's verdict: whether it is a BST, its size, and its value range.
#[derive(Clone, Copy)]
struct Report {
    bst: bool,
    size: i32,
    min: i32,
    max: i32,
}

// An absent child is an empty BST: size 0, and never a violation at its
// parent — the ±sentinel range makes both bounds checks pass.
const EMPTY: Report = Report {
    bst: true,
    size: 0,
    min: i32::MAX,
    max: i32::MIN,
};

// A node under judgement: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to judge) plus the child reports collected.
struct Frame {
    node: Option<Box<TreeNode>>,
    state: u8,
    left: Report,
    right: Report,
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
    pub fn largest_bst_subtree(root: Option<Box<TreeNode>>) -> i32 {
        // Post-order, one pass: every subtree reports whether it is a BST,
        // its size, and its min/max value; a node is a BST exactly when
        // both children are BSTs and left.max < node.val < right.min, so
        // each node is judged from its two child reports alone. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose judgement nests 10000 calls —
        // past the call stack's hold, and past the recursive drop of its
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
                    let verdict = if left.bst && right.bst && left.max < value && value < right.min {
                        let size = 1 + left.size + right.size;
                        if size > best {
                            best = size;
                        }
                        Report {
                            bst: true,
                            size,
                            min: value.min(left.min),
                            max: value.max(right.max),
                        }
                    } else {
                        // Size and range are junk here: the parent sees
                        // the false flag first and never reads them.
                        Report {
                            bst: false,
                            size: 0,
                            min: 0,
                            max: 0,
                        }
                    };
                    if let Some(parent) = stack.last_mut() {
                        if parent.state == 1 {
                            parent.left = verdict;
                        } else {
                            parent.right = verdict;
                        }
                    }
                }
            }
        }
        best
    }
}
