// This file deliberately carries no `use` imports: submission sources
// may import std::rc::Rc and std::cell::RefCell themselves without
// colliding with this preamble, so shared shapes are spelled fully
// qualified.

#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    pub fn new(val: i32) -> Self {
        ListNode { val, next: None }
    }
}
// Shared-ownership companion to ListNode: circular_list/alias_list wire
// a next pointer more than one owner reaches, which Box cannot express.
#[derive(Clone, Debug)]
pub struct SharedListNode {
    pub val: i32,
    pub next: Option<std::rc::Rc<std::cell::RefCell<SharedListNode>>>,
}

impl SharedListNode {
    pub fn new(val: i32) -> Self {
        SharedListNode { val, next: None }
    }
}
