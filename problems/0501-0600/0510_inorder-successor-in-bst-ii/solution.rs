use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn inorder_successor(tree: Option<Rc<RefCell<NodeWithNext>>>, node: i32) -> Option<Rc<RefCell<NodeWithNext>>> {
        let mut target: Option<Rc<RefCell<NodeWithNext>>> = None;
        let mut stack: Vec<Rc<RefCell<NodeWithNext>>> = Vec::new();
        if let Some(root) = tree {
            stack.push(root);
        }
        while let Some(current) = stack.pop() {
            let (val, left, right) = {
                let borrowed = current.borrow();
                (borrowed.val, borrowed.left.clone(), borrowed.right.clone())
            };
            if val == node {
                target = Some(current);
                break;
            }
            if let Some(left) = left {
                stack.push(left);
            }
            if let Some(right) = right {
                stack.push(right);
            }
        }
        let target = target?;
        let right = target.borrow().right.clone();
        if let Some(mut successor) = right {
            loop {
                let left = successor.borrow().left.clone();
                match left {
                    Some(left) => successor = left,
                    None => return Some(successor),
                }
            }
        }
        let mut current = target;
        loop {
            let parent = current.borrow().parent.clone();
            match parent {
                None => return None,
                Some(parent) => {
                    let from_left = parent
                        .borrow()
                        .left
                        .as_ref()
                        .map_or(false, |left| Rc::ptr_eq(left, &current));
                    if from_left {
                        return Some(parent);
                    }
                    current = parent;
                }
            }
        }
    }
}
