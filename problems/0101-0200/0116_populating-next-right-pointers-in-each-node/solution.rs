use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn connect(root: Option<Rc<RefCell<NodeWithNext>>>) -> Option<Rc<RefCell<NodeWithNext>>> {
        let mut level = root.clone();
        while let Some(node) = level {
            let left = node.borrow().left.clone();
            if left.is_none() {
                break;
            }
            let mut head = Some(node);
            while let Some(current) = head {
                let (left, right, next) = {
                    let borrowed = current.borrow();
                    (borrowed.left.clone(), borrowed.right.clone(), borrowed.next.clone())
                };
                if let (Some(left), Some(right)) = (&left, &right) {
                    left.borrow_mut().next = Some(right.clone());
                    if let Some(next) = &next {
                        if let Some(next_left) = next.borrow().left.clone() {
                            right.borrow_mut().next = Some(next_left);
                        }
                    }
                }
                head = next;
            }
            level = left;
        }
        root
    }
}
