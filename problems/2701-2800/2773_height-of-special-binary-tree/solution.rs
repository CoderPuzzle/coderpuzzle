use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn height_of_tree(root: Option<Rc<RefCell<RingTreeNode>>>) -> i32 {
        height(root.as_ref())
    }
}

/// A leaf of the special tree is the one node the display cannot mark:
/// the ring gives every leaf both children, and the previous leaf's right
/// child points back at the leaf itself.
fn is_leaf(node: &Rc<RefCell<RingTreeNode>>) -> bool {
    let left = node.borrow().left.clone();
    let Some(left) = left else { return false };
    let back = left.borrow().right.clone();
    matches!(back, Some(back) if Rc::ptr_eq(&back, node))
}

/// Returns the subtree's height -- its longest downward path in edges --
/// stopping at the ring-wired leaves.
fn height(node: Option<&Rc<RefCell<RingTreeNode>>>) -> i32 {
    let Some(node) = node else { return 0 };
    if is_leaf(node) {
        return 0;
    }
    let left = node.borrow().left.clone();
    let right = node.borrow().right.clone();
    1 + height(left.as_ref()).max(height(right.as_ref()))
}
