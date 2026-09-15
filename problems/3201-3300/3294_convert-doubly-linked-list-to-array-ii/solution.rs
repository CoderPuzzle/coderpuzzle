use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn to_array(node: Option<Rc<RefCell<DoublyListNode>>>) -> Vec<i32> {
        // The `prev` chain walks back to the head; the loop exits standing
        // on it, however deep in the list the handed node was. One forward
        // sweep then reads the values out already in order.
        let mut current = node;
        while let Some(previous) = current.as_ref().and_then(|node| node.borrow().prev.clone()) {
            current = Some(previous);
        }
        let mut values = Vec::new();
        while let Some(node) = current {
            values.push(node.borrow().val);
            current = node.borrow().next.clone();
        }
        values
    }
}
