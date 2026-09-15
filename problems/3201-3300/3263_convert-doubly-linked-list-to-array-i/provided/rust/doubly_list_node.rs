// Problem-provided doubly linked node (LC 3263 contract).
// Paths are fully qualified: every assembled source shares one module.
pub struct DoublyListNode {
    pub val: i32,
    pub next: Option<std::rc::Rc<std::cell::RefCell<DoublyListNode>>>,
    pub prev: Option<std::rc::Rc<std::cell::RefCell<DoublyListNode>>>,
}

impl DoublyListNode {
    pub fn new(val: i32) -> Self {
        DoublyListNode {
            val,
            next: None,
            prev: None,
        }
    }
}
