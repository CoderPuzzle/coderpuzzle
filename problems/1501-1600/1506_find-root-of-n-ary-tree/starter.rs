// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      { field val: i32, children: Vec<Option<Box<Node>>> }
//   Node:      (provided/) { field val: i32, children }; the tree arrives as its node list

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn find_root(tree: Vec<Rc<RefCell<SharedNode>>>) -> Option<Rc<RefCell<SharedNode>>> {
        panic!("TODO")
    }
}
