// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      (provided/) { field val: i32, left/right/random: Option<Rc<RefCell<...>>> }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn copy_random_binary_tree(root: Option<Rc<RefCell<RandomTreeNode>>>) -> Option<Rc<RefCell<RandomTreeNode>>> {
        panic!("TODO")
    }
}
