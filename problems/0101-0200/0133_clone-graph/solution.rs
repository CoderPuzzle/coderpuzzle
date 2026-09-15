use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

impl Solution {
    pub fn clone_graph(node: Option<Rc<RefCell<GraphNode>>>) -> Option<Rc<RefCell<GraphNode>>> {
        fn build(
            node: &Rc<RefCell<GraphNode>>,
            clones: &mut HashMap<i32, Rc<RefCell<GraphNode>>>,
        ) -> Rc<RefCell<GraphNode>> {
            let value = node.borrow().val;
            if let Some(existing) = clones.get(&value) {
                return existing.clone();
            }
            let clone = Rc::new(RefCell::new(GraphNode::new(value)));
            clones.insert(value, clone.clone());
            let neighbors = node.borrow().neighbors.clone();
            for neighbor in neighbors {
                clone.borrow_mut().neighbors.push(build(&neighbor, clones));
            }
            clone
        }
        node.as_ref().map(|node| build(node, &mut HashMap::new()))
    }
}
