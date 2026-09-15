// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      (provided/) { field val: i32, next/random }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn copy_random_list(head: Option<Rc<RefCell<RandomListNode>>>) -> Option<Rc<RefCell<RandomListNode>>> {
        panic!("TODO")
    }
}
