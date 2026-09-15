// Problem-provided n-ary node shared via Rc (LC 1516 contract): p and q
// arrive as real nodes of the aliased tree, so rewiring a node's children
// through them must mutate that same tree — the nodes share ownership
// instead of living in Box children. Paths are fully qualified: every
// assembled source shares one module.
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
