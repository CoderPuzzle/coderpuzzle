use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn insert(head: Option<Rc<RefCell<SharedListNode>>>, insert_value: i32) -> Option<Rc<RefCell<SharedListNode>>> {
        let head = match head {
            None => {
                let node = Rc::new(RefCell::new(SharedListNode::new(insert_value)));
                node.borrow_mut().next = Some(node.clone());
                return Some(node);
            }
            Some(head) => head,
        };
        let node = Rc::new(RefCell::new(SharedListNode::new(insert_value)));
        let mut previous = head.clone();
        loop {
            let current = previous.borrow().next.clone().unwrap();
            if std::rc::Rc::ptr_eq(&current, &head) {
                break;
            }
            let previous_value = previous.borrow().val;
            let current_value = current.borrow().val;
            let fits = previous_value <= insert_value && insert_value <= current_value;
            let wraps =
                previous_value > current_value && (insert_value >= previous_value || insert_value <= current_value);
            if fits || wraps {
                break;
            }
            previous = current;
        }
        let current = previous.borrow().next.clone().unwrap();
        previous.borrow_mut().next = Some(node.clone());
        node.borrow_mut().next = Some(current);
        Some(head)
    }
}
