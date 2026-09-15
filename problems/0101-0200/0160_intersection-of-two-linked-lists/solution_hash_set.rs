use std::cell::RefCell;
use std::collections::HashSet;
use std::rc::Rc;

impl Solution {
    pub fn get_intersection_node(
        first: Option<Rc<RefCell<SharedListNode>>>,
        second: Option<Rc<RefCell<SharedListNode>>>,
    ) -> Option<Rc<RefCell<SharedListNode>>> {
        // Rc::as_ptr gives a node's address: the set keys on identity, the
        // way two distinct Rcs can reach the very same shared node.
        let mut in_first: HashSet<*const RefCell<SharedListNode>> = HashSet::new();
        let mut node = first;
        while let Some(current) = node {
            in_first.insert(Rc::as_ptr(&current));
            node = current.borrow().next.clone();
        }
        let mut node = second;
        while let Some(current) = node {
            let key = Rc::as_ptr(&current);
            if in_first.contains(&key) {
                return Some(current);
            }
            node = current.borrow().next.clone();
        }
        None
    }
}
