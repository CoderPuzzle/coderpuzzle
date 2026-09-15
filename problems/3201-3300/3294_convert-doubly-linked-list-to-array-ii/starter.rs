// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      (provided/) { field val: i32, next/prev: Option<Rc<RefCell<...>>> }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn to_array(node: Option<Rc<RefCell<DoublyListNode>>>) -> Vec<i32> {
        panic!("TODO")
    }
}
