use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn copy_random_binary_tree(root: Option<Rc<RefCell<RandomTreeNode>>>) -> Option<Rc<RefCell<RandomTreeNode>>> {
        let root = root?;
        // Weave: every original node's left slot comes to hold its own clone,
        // and the clone's left holds the original's former left child, so the
        // original structure stays walkable one step down.
        let mut stack: Vec<Rc<RefCell<RandomTreeNode>>> = vec![root.clone()];
        while let Some(node) = stack.pop() {
            let left = node.borrow().left.clone();
            let right = node.borrow().right.clone();
            let clone = Rc::new(RefCell::new(RandomTreeNode::new(node.borrow().val)));
            clone.borrow_mut().left = left.clone();
            node.borrow_mut().left = Some(clone);
            if let Some(child) = left {
                stack.push(child);
            }
            if let Some(child) = right {
                stack.push(child);
            }
        }
        // Far links: an original's clone is node.left, so the clone of
        // anything the original points across to — its random target and
        // its right child — is that target's own left.
        let mut stack: Vec<Rc<RefCell<RandomTreeNode>>> = vec![root.clone()];
        while let Some(node) = stack.pop() {
            let clone = node.borrow().left.clone().unwrap();
            let random = node.borrow().random.clone();
            clone.borrow_mut().random = random.map(|target| target.borrow().left.clone().unwrap());
            let right = node.borrow().right.clone();
            if let Some(target) = right.as_ref() {
                let far = target.borrow().left.clone().unwrap();
                clone.borrow_mut().right = Some(far);
                stack.push(target.clone());
            }
            let left = clone.borrow().left.clone();
            if let Some(child) = left {
                stack.push(child);
            }
        }
        let answer = root.borrow().left.clone();
        // Split: restore each original's left child and hand the clone the
        // clone of that subtree.
        let mut stack: Vec<Rc<RefCell<RandomTreeNode>>> = vec![root.clone()];
        while let Some(node) = stack.pop() {
            let clone = node.borrow().left.clone().unwrap();
            let left = clone.borrow().left.clone();
            let left_clone = left.as_ref().map(|child| child.borrow().left.clone().unwrap());
            clone.borrow_mut().left = left_clone;
            node.borrow_mut().left = left.clone();
            if let Some(child) = left {
                stack.push(child);
            }
            let right = node.borrow().right.clone();
            if let Some(child) = right {
                stack.push(child);
            }
        }
        answer
    }
}
