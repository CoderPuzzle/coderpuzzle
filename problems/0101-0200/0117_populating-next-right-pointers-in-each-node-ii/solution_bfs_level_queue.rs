use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;

impl Solution {
    pub fn connect(root: Option<Rc<RefCell<NodeWithNext>>>) -> Option<Rc<RefCell<NodeWithNext>>> {
        // Handle the empty tree up front, before the queue exists.
        let root = match root {
            Some(node) => node,
            None => return None,
        };
        let mut queue: VecDeque<Rc<RefCell<NodeWithNext>>> = VecDeque::new();
        queue.push_back(root.clone());
        while !queue.is_empty() {
            // queue.len() is this level's width; children pushed inside the
            // loop belong to the next level and never enter this round.
            let mut previous: Option<Rc<RefCell<NodeWithNext>>> = None;
            for _ in 0..queue.len() {
                let node = queue.pop_front().unwrap();
                // Link to whoever leaves the queue next within the same
                // level; the level's last node keeps the empty next it
                // started with.
                if let Some(previous) = &previous {
                    previous.borrow_mut().next = Some(node.clone());
                }
                previous = Some(node.clone());
                let (left, right) = {
                    let borrowed = node.borrow();
                    (borrowed.left.clone(), borrowed.right.clone())
                };
                if let Some(child) = left {
                    queue.push_back(child);
                }
                if let Some(child) = right {
                    queue.push_back(child);
                }
            }
        }
        Some(root)
    }
}
