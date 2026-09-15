use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn connect(root: Option<Rc<RefCell<NodeWithNext>>>) -> Option<Rc<RefCell<NodeWithNext>>> {
        let mut level = root.clone();
        while let Some(level_head) = level {
            let mut head: Option<Rc<RefCell<NodeWithNext>>> = None;
            let mut tail: Option<Rc<RefCell<NodeWithNext>>> = None;
            let mut node = Some(level_head);
            while let Some(current) = node {
                let (left, right, next) = {
                    let borrowed = current.borrow();
                    (borrowed.left.clone(), borrowed.right.clone(), borrowed.next.clone())
                };
                for child in [left, right] {
                    if let Some(child) = child {
                        match &tail {
                            Some(t) => t.borrow_mut().next = Some(child.clone()),
                            None => head = Some(child.clone()),
                        }
                        tail = Some(child);
                    }
                }
                node = next;
            }
            level = head;
        }
        root
    }
}
