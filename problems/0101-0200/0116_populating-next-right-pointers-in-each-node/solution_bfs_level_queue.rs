use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;

impl Solution {
    pub fn connect(root: Option<Rc<RefCell<NodeWithNext>>>) -> Option<Rc<RefCell<NodeWithNext>>> {
        let root = match root {
            Some(node) => node,
            None => return None,
        };
        let mut queue: VecDeque<Rc<RefCell<NodeWithNext>>> = VecDeque::new();
        queue.push_back(root.clone());
        while !queue.is_empty() {
            // Snapshot the width now: children pushed below belong to the
            // next level, so draining exactly this many nodes walks one
            // level per round.
            let width = queue.len();
            let mut previous: Option<Rc<RefCell<NodeWithNext>>> = None;
            for _ in 0..width {
                let node = queue.pop_front().unwrap();
                // The node dequeued just before this one is exactly its
                // right-hand neighbor; the level's last node finds no
                // successor and keeps its empty `next`.
                if let Some(previous) = &previous {
                    previous.borrow_mut().next = Some(node.clone());
                }
                previous = Some(node.clone());
                let (left, right) = {
                    let borrowed = node.borrow();
                    (borrowed.left.clone(), borrowed.right.clone())
                };
                if let Some(left) = left {
                    queue.push_back(left);
                }
                if let Some(right) = right {
                    queue.push_back(right);
                }
            }
        }
        Some(root)
    }
}
