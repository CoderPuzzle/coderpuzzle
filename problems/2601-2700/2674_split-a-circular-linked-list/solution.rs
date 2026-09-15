use std::cell::RefCell;
use std::rc::Rc;

type Shared = std::rc::Rc<std::cell::RefCell<SharedListNode>>;

impl Solution {
    pub fn split_circular_linked_list(list: Option<Shared>) -> Vec<Option<Shared>> {
        let head = list.expect("the ring holds at least two nodes");
        let mut count = 1;
        let mut tail = head.clone();
        loop {
            let next = tail.borrow().next.clone().unwrap();
            if std::rc::Rc::ptr_eq(&next, &head) {
                break;
            }
            tail = next;
            count += 1;
        }
        let half = (count + 1) / 2;
        let mut first_tail = head.clone();
        for _ in 0..half - 1 {
            let next = first_tail.borrow().next.clone().unwrap();
            first_tail = next;
        }
        let second_head = first_tail.borrow().next.clone().unwrap();
        let mut second_tail = second_head.clone();
        loop {
            let next = second_tail.borrow().next.clone().unwrap();
            if std::rc::Rc::ptr_eq(&next, &head) {
                break;
            }
            second_tail = next;
        }
        first_tail.borrow_mut().next = Some(head.clone());
        second_tail.borrow_mut().next = Some(second_head.clone());
        vec![Some(head), Some(second_head)]
    }
}
