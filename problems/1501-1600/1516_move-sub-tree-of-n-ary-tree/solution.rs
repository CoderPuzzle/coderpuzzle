use std::cell::RefCell;
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
        // One sweep gathers the facts the rewiring needs: p's parent, q's
        // parent, and whether q sits inside p's subtree -- depth counts how
        // many levels below p the walk currently is (0 means outside).
        // Identity is Rc::ptr_eq: p and q are real nodes of this tree.
        let mut p_parent: Option<Rc<RefCell<SharedNode>>> = None;
        let mut q_parent: Option<Rc<RefCell<SharedNode>>> = None;
        let mut q_below = false;
        let mut stack: Vec<(Rc<RefCell<SharedNode>>, Option<Rc<RefCell<SharedNode>>>, usize)> =
            vec![(root.clone(), None, 0)];
        while let Some((node, parent, depth)) = stack.pop() {
            if Rc::ptr_eq(&node, &p) {
                p_parent = parent.clone();
            }
            if Rc::ptr_eq(&node, &q) {
                q_parent = parent.clone();
                q_below = depth > 0;
            }
            let next = if depth > 0 || Rc::ptr_eq(&node, &p) {
                depth + 1
            } else {
                0
            };
            for child in node.borrow().children.clone().into_iter().flatten() {
                stack.push((child, Some(node.clone()), next));
            }
        }
        // p already hangs exactly where the move wants it: nothing to do.
        let p_is_q_child = q.borrow().children.iter().flatten().any(|child| Rc::ptr_eq(child, &p));
        if p_is_q_child {
            return Some(root);
        }
        if q_below {
            // Case 1: q travels inside p's subtree, so free q and re-hang it
            // where p stood -- in p's parent's children list, or at the root
            // when p is the root -- before p becomes q's last child.
            let q_parent = q_parent.expect("q is not the root");
            Self::detach(&q_parent, &q);
            match p_parent {
                None => {
                    q.borrow_mut().children.push(Some(p.clone()));
                    return Some(q);
                }
                Some(p_parent) => {
                    let mut holder = p_parent.borrow_mut();
                    let slot = holder
                        .children
                        .iter()
                        .position(|child| child.as_ref().is_some_and(|c| Rc::ptr_eq(c, &p)))
                        .expect("p hangs from its parent");
                    holder.children[slot] = Some(q.clone());
                    drop(holder);
                    q.borrow_mut().children.push(Some(p.clone()));
                    return Some(root);
                }
            }
        }
        // Cases 2 and 3: a plain re-attachment of p (with its subtree).
        let p_parent = p_parent.expect("p is not the root");
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
