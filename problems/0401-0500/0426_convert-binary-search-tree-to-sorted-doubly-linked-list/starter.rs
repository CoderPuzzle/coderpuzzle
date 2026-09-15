// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   NodeWithNext:  { field val: i32, left (prev) / right (next) / parent }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn tree_to_doubly_list(root: Option<Box<TreeNode>>) -> Option<Rc<RefCell<NodeWithNext>>> {
        panic!("TODO")
    }
}
