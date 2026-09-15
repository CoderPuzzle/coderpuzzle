// Problem-provided shared tree node (LC 2773 contract): the judge decodes
// the binary display into these nodes and ring-wires the leaves, and a
// ring cannot live in Box children. Paths are fully qualified: every
// assembled source shares one module (no imports).
pub struct RingTreeNode {
    pub val: i32,
    pub left: Option<std::rc::Rc<std::cell::RefCell<RingTreeNode>>>,
    pub right: Option<std::rc::Rc<std::cell::RefCell<RingTreeNode>>>,
}

impl RingTreeNode {
    pub fn new(val: i32) -> Self {
        RingTreeNode {
            val,
            left: None,
            right: None,
        }
    }
}
