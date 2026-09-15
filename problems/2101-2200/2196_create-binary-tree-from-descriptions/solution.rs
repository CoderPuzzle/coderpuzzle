use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn create_binary_tree(descriptions: Vec<Vec<i32>>) -> Option<Box<TreeNode>> {
        // For each parent value, its optional left/right child values; the
        // root is the one value that never appears on the child side.
        let mut kids: HashMap<i32, [Option<i32>; 2]> = HashMap::new();
        let mut seen: HashSet<i32> = HashSet::new();
        let mut children: HashSet<i32> = HashSet::new();
        for d in &descriptions {
            let (parent, child, is_left) = (d[0], d[1], d[2] == 1);
            seen.insert(parent);
            seen.insert(child);
            children.insert(child);
            let slot = kids.entry(parent).or_insert([None, None]);
            if is_left {
                slot[0] = Some(child);
            } else {
                slot[1] = Some(child);
            }
        }
        let root_value = *seen.iter().find(|&v| !children.contains(v))?;
        Self::assemble(&kids, root_value)
    }

    // Each value has exactly one parent, so assembly visits every node once;
    // reading the immutable adjacency map needs no shared ownership.
    fn assemble(kids: &HashMap<i32, [Option<i32>; 2]>, value: i32) -> Option<Box<TreeNode>> {
        let mut node = Box::new(TreeNode::new(value));
        if let Some(slot) = kids.get(&value) {
            node.left = slot[0].map(|v| Self::assemble(kids, v)).flatten();
            node.right = slot[1].map(|v| Self::assemble(kids, v)).flatten();
        }
        Some(node)
    }
}
