// Problem-provided doubly linked node (LC 3294 contract). Paths are
// fully qualified: every assembled source shares one module (no
// imports).
pub struct DoublyListNode {
    pub val: i32,
    pub prev: Option<std::rc::Rc<std::cell::RefCell<DoublyListNode>>>,
    pub next: Option<std::rc::Rc<std::cell::RefCell<DoublyListNode>>>,
}

impl DoublyListNode {
    pub fn new(val: i32) -> Self {
        DoublyListNode {
            val,
            prev: None,
            next: None,
        }
    }
}
