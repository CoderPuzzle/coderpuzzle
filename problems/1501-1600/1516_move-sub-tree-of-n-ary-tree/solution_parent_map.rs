use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

impl Solution {
    pub fn move_sub_tree(
        root: Option<Rc<RefCell<SharedNode>>>,
        p: Option<Rc<RefCell<SharedNode>>>,
        q: Option<Rc<RefCell<SharedNode>>>,
    ) -> Option<Rc<RefCell<SharedNode>>> {
        let root = root?;
        let p = p?;
        let q = q?;
        // Pass one records every node's parent in a registry keyed by value
        // (the values are unique; the root has no entry). Identity stays
        // Rc::ptr_eq: p and q are real nodes of this tree.
        let mut parent: HashMap<i32, Rc<RefCell<SharedNode>>> = HashMap::new();
        let mut stack = vec![root.clone()];
        while let Some(node) = stack.pop() {
            for child in node.borrow().children.clone().into_iter().flatten() {
                let val = child.borrow().val;
                parent.insert(val, node.clone());
                stack.push(child);
            }
        }
        // Pass two probes p's subtree for q.
        let mut below = false;
        let mut probe = vec![p.clone()];
        while let Some(node) = probe.pop() {
            if Rc::ptr_eq(&node, &q) {
                below = true;
                break;
            }
            probe.extend(node.borrow().children.clone().into_iter().flatten());
        }
        // p already hangs exactly where the move wants it: nothing to do.
        let p_is_q_child = q.borrow().children.iter().flatten().any(|child| Rc::ptr_eq(child, &p));
        if p_is_q_child {
            return Some(root);
        }
        if below {
            let q_parent = parent[&q.borrow().val].clone();
            Self::detach(&q_parent, &q);
            match parent.get(&p.borrow().val) {
                None => {
                    // p is the root: q takes over.
                    q.borrow_mut().children.push(Some(p.clone()));
                    return Some(q);
                }
                Some(holder) => {
                    let slot = holder
                        .borrow()
                        .children
                        .iter()
                        .position(|child| child.as_ref().is_some_and(|c| Rc::ptr_eq(c, &p)))
                        .expect("p hangs from its parent");
                    holder.borrow_mut().children[slot] = Some(q.clone());
                    q.borrow_mut().children.push(Some(p.clone()));
                    return Some(root);
                }
            }
        }
        let p_parent = parent[&p.borrow().val].clone();
        Self::detach(&p_parent, &p);
        q.borrow_mut().children.push(Some(p.clone()));
        Some(root)
    }

    // detach removes node from parent's children list (identity is pointer
    // equality; the constraint guarantees the node hangs there).
    fn detach(parent: &Rc<RefCell<SharedNode>>, node: &Rc<RefCell<SharedNode>>) {
        parent
            .borrow_mut()
            .children
            .retain(|child| !child.as_ref().is_some_and(|c| Rc::ptr_eq(c, node)));
    }
}
