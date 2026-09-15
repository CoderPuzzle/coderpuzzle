// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      (provided/) { field val: i32, left/right: Option<Rc<RefCell<...>>> }; the judge ring-wires the leaves

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn height_of_tree(root: Option<Rc<RefCell<RingTreeNode>>>) -> i32 {
        panic!("TODO")
    }
}
