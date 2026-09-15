// Problem-provided tree node with a random pointer (LC 1485 contract).
// Paths are fully qualified: every assembled source shares one module.
pub struct RandomTreeNode {
    pub val: i32,
    pub left: Option<std::rc::Rc<std::cell::RefCell<RandomTreeNode>>>,
    pub right: Option<std::rc::Rc<std::cell::RefCell<RandomTreeNode>>>,
    pub random: Option<std::rc::Rc<std::cell::RefCell<RandomTreeNode>>>,
}

impl RandomTreeNode {
    pub fn new(val: i32) -> Self {
        RandomTreeNode {
            val,
            left: None,
            right: None,
            random: None,
        }
    }
}
