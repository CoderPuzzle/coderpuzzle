// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   MultiListNode: { field val: i32, prev/next/child }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn flatten(head: Option<Rc<RefCell<MultiListNode>>>) -> Option<Rc<RefCell<MultiListNode>>> {
        panic!("TODO")
    }
}
