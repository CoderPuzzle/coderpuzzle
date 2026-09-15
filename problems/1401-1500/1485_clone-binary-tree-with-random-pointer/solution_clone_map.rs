use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

impl Solution {
    pub fn copy_random_binary_tree(root: Option<Rc<RefCell<RandomTreeNode>>>) -> Option<Rc<RefCell<RandomTreeNode>>> {
        let clones: RefCell<HashMap<usize, Rc<RefCell<RandomTreeNode>>>> = RefCell::new(HashMap::new());
        // A raw-pointer key: two references to the same input node must clone
        // once (Rc<RandomTreeNode> itself is not a map key).
        fn clone(
            node: &Option<Rc<RefCell<RandomTreeNode>>>,
            clones: &RefCell<HashMap<usize, Rc<RefCell<RandomTreeNode>>>>,
        ) -> Option<Rc<RefCell<RandomTreeNode>>> {
            let node = node.as_ref()?;
            let key = Rc::as_ptr(node) as usize;
            if let Some(existing) = clones.borrow().get(&key).cloned() {
                return Some(existing);
            }
            let copy = Rc::new(RefCell::new(RandomTreeNode::new(node.borrow().val)));
            clones.borrow_mut().insert(key, copy.clone());
            let left = node.borrow().left.clone();
            let right = node.borrow().right.clone();
            let random = node.borrow().random.clone();
            copy.borrow_mut().left = clone(&left, clones);
            copy.borrow_mut().right = clone(&right, clones);
            copy.borrow_mut().random = clone(&random, clones);
            Some(copy)
        }
        clone(&root, &clones)
    }
}
