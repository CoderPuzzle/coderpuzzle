use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn find_root(tree: Vec<Rc<RefCell<SharedNode>>>) -> Option<Rc<RefCell<SharedNode>>> {
        // Value cancellation: every non-root appears exactly once as someone's
        // child, so summing every node's value and subtracting every child's
        // value cancels everything except the root's value. A second scan
        // turns that surviving value back into its node — no extra collection
        // is kept at any point. The running total spans 5·10⁴ i32 values,
        // so it accumulates in an i64.
        let mut total: i64 = 0;
        for node in &tree {
            total += node.borrow().val as i64;
            for child in node.borrow().children.iter().flatten() {
                total -= child.borrow().val as i64;
            }
        }
        tree.into_iter().find(|node| node.borrow().val as i64 == total)
    }
}
