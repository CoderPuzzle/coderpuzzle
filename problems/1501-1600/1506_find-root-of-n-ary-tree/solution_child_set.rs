use std::cell::RefCell;
use std::collections::HashSet;
use std::rc::Rc;

impl Solution {
    pub fn find_root(tree: Vec<Rc<RefCell<SharedNode>>>) -> Option<Rc<RefCell<SharedNode>>> {
        // Indegree zero: every node except the root appears exactly once as
        // someone's child. Collect the nodes' addresses, drop every address
        // seen among the children, and the one survivor is the root.
        let mut survivors: HashSet<usize> = tree.iter().map(|node| Rc::as_ptr(node) as usize).collect();
        for node in &tree {
            for child in node.borrow().children.iter().flatten() {
                survivors.remove(&(Rc::as_ptr(child) as usize));
            }
        }
        tree.into_iter()
            .find(|node| survivors.contains(&(Rc::as_ptr(node) as usize)))
    }
}
