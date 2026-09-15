use std::collections::{HashMap, VecDeque};

impl Solution {
    pub fn clone_tree(root: Option<Box<Node>>) -> Option<Box<Node>> {
        let root = root?;
        // Level-order copy: every original node gets exactly one fresh clone
        // and the registry maps the original's address to its copy's slot.
        // Boxes are only assembled after the walk, so a copy's slot in
        // `copies` is its registry entry until the wiring sweep hands out
        // the children.
        let mut copies: Vec<Option<Box<Node>>> = Vec::new();
        let mut registry: HashMap<usize, usize> = HashMap::new();
        let mut order: Vec<(&Node, usize)> = Vec::new();
        let mut queue: VecDeque<(&Node, usize)> = VecDeque::new();
        registry.insert(&*root as *const Node as usize, 0);
        copies.push(Some(Box::new(Node {
            val: root.val,
            children: Vec::new(),
        })));
        order.push((&*root, 0));
        queue.push_back((&*root, 0));
        while let Some((node, slot)) = queue.pop_front() {
            for held in node.children.iter().flatten() {
                let child: &Node = held;
                let next = copies.len();
                registry.insert(child as *const Node as usize, next);
                copies.push(Some(Box::new(Node {
                    val: child.val,
                    children: Vec::new(),
                })));
                order.push((child, next));
                queue.push_back((child, next));
            }
        }
        // Replay the walk deepest-first: each copy receives the registry
        // entries of the original's children, in the original's order, and
        // a copy is fully wired before its parent's take claims it.
        for (node, slot) in order.iter().rev() {
            for held in node.children.iter().flatten() {
                let child: &Node = held;
                let key = child as *const Node as usize;
                let copy = copies[registry[&key]].take();
                copies[*slot].as_mut().unwrap().children.push(copy);
            }
        }
        copies.into_iter().next().flatten()
    }
}
