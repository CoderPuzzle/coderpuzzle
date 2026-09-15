// Problem-provided n-ary node shared via Rc (LC 1506 contract): the tree
// arrives as its node list and the solution hands one of the input nodes
// back, so the nodes must share ownership instead of living in Box
// children. Paths are fully qualified: every assembled source shares one
// module.
pub struct SharedNode {
    pub val: i32,
    pub children: Vec<Option<std::rc::Rc<std::cell::RefCell<SharedNode>>>>,
}

impl SharedNode {
    pub fn new(val: i32) -> Self {
        SharedNode {
            val,
            children: Vec::new(),
        }
    }
}
