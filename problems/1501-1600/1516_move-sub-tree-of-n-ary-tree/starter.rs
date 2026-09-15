// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      { field val: i32, children: Vec<Option<Box<Node>>> }
//   Node:      (provided/) { field val: i32, children }; the parameter is a node inside the aliased tree

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn move_sub_tree(
        root: Option<Rc<RefCell<SharedNode>>>,
        p: Option<Rc<RefCell<SharedNode>>>,
        q: Option<Rc<RefCell<SharedNode>>>,
    ) -> Option<Rc<RefCell<SharedNode>>> {
        panic!("TODO")
    }
}
