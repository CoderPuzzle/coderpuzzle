// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }
//   Node:      (provided/) { field val: i32, neighbors }

use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn clone_graph(node: Option<Rc<RefCell<GraphNode>>>) -> Option<Rc<RefCell<GraphNode>>> {
        panic!("TODO")
    }
}
