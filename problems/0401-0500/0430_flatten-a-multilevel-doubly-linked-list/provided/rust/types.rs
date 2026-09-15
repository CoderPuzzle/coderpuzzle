// This file deliberately carries no `use` imports: submission sources
// may import std::rc::Rc and std::cell::RefCell themselves without
// colliding with this preamble, so shared shapes are spelled fully
// qualified.

// Shared-ownership shape: see NodeWithNext above.
#[derive(Clone, Debug)]
pub struct MultiListNode {
    pub val: i32,
    pub prev: Option<std::rc::Rc<std::cell::RefCell<MultiListNode>>>,
    pub next: Option<std::rc::Rc<std::cell::RefCell<MultiListNode>>>,
    pub child: Option<std::rc::Rc<std::cell::RefCell<MultiListNode>>>,
}

impl MultiListNode {
    pub fn new(val: i32) -> Self {
        MultiListNode {
            val,
            prev: None,
            next: None,
            child: None,
        }
    }
}
