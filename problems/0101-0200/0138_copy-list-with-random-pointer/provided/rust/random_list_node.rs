// Problem-provided list node with a random pointer (LC 138 contract).
// Paths are fully qualified: every assembled source shares one module.
pub struct RandomListNode {
    pub val: i32,
    pub next: Option<std::rc::Rc<std::cell::RefCell<RandomListNode>>>,
    pub random: Option<std::rc::Rc<std::cell::RefCell<RandomListNode>>>,
}

impl RandomListNode {
    pub fn new(val: i32) -> Self {
        RandomListNode {
            val,
            next: None,
            random: None,
        }
    }
}
