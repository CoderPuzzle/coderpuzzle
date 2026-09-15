use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn get_intersection_node(
        first: Option<Rc<RefCell<SharedListNode>>>,
        second: Option<Rc<RefCell<SharedListNode>>>,
    ) -> Option<Rc<RefCell<SharedListNode>>> {
        let mut a = first.clone();
        let mut b = second.clone();
        loop {
            if a.as_ref().map(std::rc::Rc::as_ptr) == b.as_ref().map(std::rc::Rc::as_ptr) {
                return a;
            }
            a = match &a {
                Some(node) => node.borrow().next.clone(),
                None => second.clone(),
            };
            b = match &b {
                Some(node) => node.borrow().next.clone(),
                None => first.clone(),
            };
        }
    }
}
