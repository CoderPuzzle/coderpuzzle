use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

impl Solution {
    pub fn copy_random_list(head: Option<Rc<RefCell<RandomListNode>>>) -> Option<Rc<RefCell<RandomListNode>>> {
        let clones: std::cell::RefCell<HashMap<usize, Rc<RefCell<RandomListNode>>>> =
            std::cell::RefCell::new(HashMap::new());
        // A raw-pointer key: two references to the same input node must
        // clone once (Rc<RandomListNode> itself is not a map key).
        fn find(
            node: &Option<Rc<RefCell<RandomListNode>>>,
            clones: &std::cell::RefCell<HashMap<usize, Rc<RefCell<RandomListNode>>>>,
        ) -> Option<Rc<RefCell<RandomListNode>>> {
            let node = node.as_ref()?;
            let key = std::rc::Rc::as_ptr(node) as usize;
            if let Some(clone) = clones.borrow().get(&key).cloned() {
                return Some(clone);
            }
            let clone = Rc::new(RefCell::new(RandomListNode::new(node.borrow().val)));
            clones.borrow_mut().insert(key, clone.clone());
            let next = node.borrow().next.clone();
            let random = node.borrow().random.clone();
            clone.borrow_mut().next = find(&next, clones);
            clone.borrow_mut().random = find(&random, clones);
            Some(clone)
        }
        find(&head, &clones)
    }
}
