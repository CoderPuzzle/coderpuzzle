use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn to_array(head: Option<Box<ListNode>>) -> Option<Rc<RefCell<DoublyListNode>>> {
        // `first` remembers the head to return; `tail` is the node every
        // fresh append points its `prev` back at. The first node is the one
        // append with no predecessor, so its `prev` stays None.
        let mut first: Option<Rc<RefCell<DoublyListNode>>> = None;
        let mut tail: Option<Rc<RefCell<DoublyListNode>>> = None;
        let mut cursor = head;
        while let Some(node) = cursor {
            let ListNode { val, next } = *node;
            cursor = next;
            let fresh = Rc::new(RefCell::new(DoublyListNode::new(val)));
            match tail.take() {
                Some(previous) => {
                    previous.borrow_mut().next = Some(fresh.clone());
                    fresh.borrow_mut().prev = Some(previous);
                }
                None => first = Some(fresh.clone()),
            }
            tail = Some(fresh);
        }
        first
    }
}
