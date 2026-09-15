// This file deliberately carries no `use` imports: submission sources
// may import std::rc::Rc and std::cell::RefCell themselves without
// colliding with this preamble, so shared shapes are spelled fully
// qualified.

// Shared-ownership shape: a next/prev/parent pointer that two owners
// reach cannot be expressed with Box's single owner, so this renders as
// Rc<RefCell<...>>.
#[derive(Clone, Debug)]
pub struct NodeWithNext {
    pub val: i32,
    pub left: Option<std::rc::Rc<std::cell::RefCell<NodeWithNext>>>,
    pub right: Option<std::rc::Rc<std::cell::RefCell<NodeWithNext>>>,
    pub next: Option<std::rc::Rc<std::cell::RefCell<NodeWithNext>>>,
    pub parent: Option<std::rc::Rc<std::cell::RefCell<NodeWithNext>>>,
}

impl NodeWithNext {
    pub fn new(val: i32) -> Self {
        NodeWithNext {
            val,
            left: None,
            right: None,
            next: None,
            parent: None,
        }
    }
}
