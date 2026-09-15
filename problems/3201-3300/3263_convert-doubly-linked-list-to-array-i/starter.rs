// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      (provided/) { field val: i32, next/prev: Option<Rc<RefCell<...>>> }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn to_array(head: Option<Box<ListNode>>) -> Option<Rc<RefCell<DoublyListNode>>> {
        panic!("TODO")
    }
}
