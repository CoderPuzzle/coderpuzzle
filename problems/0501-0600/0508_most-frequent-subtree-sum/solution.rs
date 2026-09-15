use std::collections::HashMap;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

// A node under traversal: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to sum) plus the sum of the subtrees already
// finished beneath it.
struct Frame {
    node: Option<Box<TreeNode>>,
    state: u8,
    children: i32,
}

impl Frame {
    fn new(node: Box<TreeNode>) -> Frame {
        Frame {
            node: Some(node),
            state: 0,
            children: 0,
        }
    }
}

impl Solution {
    pub fn find_frequent_tree_sum(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // Post-order, one pass: a node's subtree sum is its own value plus
        // the two sums already computed beneath it, so each node's sum is
        // settled exactly once and the counter tallies every subtree. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose walk would nest 10000 calls —
        // past the call stack's hold, and past the recursive drop of its
        // boxes.
        let mut counts: HashMap<i32, i32> = HashMap::new();
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
                    let total = value + frame.children;
                    *counts.entry(total).or_insert(0) += 1;
                    if let Some(parent) = stack.last_mut() {
                        parent.children += total;
                    }
                }
            }
        }
        let best = *counts.values().max().unwrap();
        let mut result: Vec<i32> = counts
            .iter()
            .filter(|&(_, &count)| count == best)
            .map(|(&total, _)| total)
            .collect();
        // The final sort pins the output to the ascending order the judge
        // compares exactly.
        result.sort_unstable();
        result
    }
}
