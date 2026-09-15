use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn to_array(node: Option<Rc<RefCell<DoublyListNode>>>) -> Vec<i32> {
        // Walk `next` to the tail without collecting anything; the
        // backward sweep over `prev` then gathers the whole list, tail
        // first. One in-place reverse turns that tail-to-head buffer into
        // the answer.
        let mut current = node;
        while let Some(next) = current.as_ref().and_then(|node| node.borrow().next.clone()) {
            current = Some(next);
        }
        let mut values = Vec::new();
        while let Some(node) = current {
            values.push(node.borrow().val);
            current = node.borrow().prev.clone();
        }
        values.reverse();
        values
    }
}
