// Problem-provided graph node (LC 133 contract). Paths are fully
// qualified: every assembled source shares one module (no imports).
pub struct GraphNode {
    pub val: i32,
    pub neighbors: Vec<std::rc::Rc<std::cell::RefCell<GraphNode>>>,
}

impl GraphNode {
    pub fn new(val: i32) -> Self {
        GraphNode {
            val,
            neighbors: Vec::new(),
        }
    }
}
