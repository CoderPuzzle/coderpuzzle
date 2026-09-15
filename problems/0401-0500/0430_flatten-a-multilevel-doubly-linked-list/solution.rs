use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn flatten(head: Option<Rc<RefCell<MultiListNode>>>) -> Option<Rc<RefCell<MultiListNode>>> {
        let mut current = head.clone();
        while let Some(node) = current {
            let next = node.borrow().next.clone();
            let child = node.borrow().child.clone();
            if let Some(child) = child {
                node.borrow_mut().child = None;
                let mut tail = child.clone();
                loop {
                    let following = tail.borrow().next.clone();
                    match following {
                        Some(next_node) => tail = next_node,
                        None => break,
                    }
                }
                tail.borrow_mut().next = next.clone();
                if let Some(next) = &next {
                    next.borrow_mut().prev = Some(tail.clone());
                }
                node.borrow_mut().next = Some(child.clone());
                child.borrow_mut().prev = Some(node.clone());
            }
            current = node.borrow().next.clone();
        }
        head
    }
}
