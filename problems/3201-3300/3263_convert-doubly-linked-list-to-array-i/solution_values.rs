use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn to_array(head: Option<Box<ListNode>>) -> Option<Rc<RefCell<DoublyListNode>>> {
        // Sweep one reads: the values ride out the walk in a buffer.
        let mut values: Vec<i32> = Vec::new();
        let mut cursor = head;
        while let Some(node) = cursor {
            let ListNode { val, next } = *node;
            values.push(val);
            cursor = next;
        }
        // Sweep two chains: every buffered value becomes a node appended to
        // the growing tail, pointing back at the node before it.
        let mut first: Option<Rc<RefCell<DoublyListNode>>> = None;
        let mut tail: Option<Rc<RefCell<DoublyListNode>>> = None;
        for value in values {
            let fresh = Rc::new(RefCell::new(DoublyListNode::new(value)));
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
