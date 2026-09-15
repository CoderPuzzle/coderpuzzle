use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn tree_to_doubly_list(root: Option<Box<TreeNode>>) -> Option<Rc<RefCell<NodeWithNext>>> {
        let mut values = Vec::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut node = root.as_deref();
        while !stack.is_empty() || node.is_some() {
            while let Some(current) = node {
                stack.push(current);
                node = current.left.as_deref();
            }
            let current = stack.pop().unwrap();
            values.push(current.val);
            node = current.right.as_deref();
        }
        let nodes: Vec<_> = values
            .into_iter()
            .map(|value| Rc::new(RefCell::new(NodeWithNext::new(value))))
            .collect();
        if nodes.is_empty() {
            return None;
        }
        for pair in nodes.windows(2) {
            pair[0].borrow_mut().right = Some(pair[1].clone());
            pair[1].borrow_mut().left = Some(pair[0].clone());
        }
        let last = nodes.len() - 1;
        nodes[last].borrow_mut().right = Some(nodes[0].clone());
        nodes[0].borrow_mut().left = Some(nodes[last].clone());
        Some(nodes[0].clone())
    }
}
