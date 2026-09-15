use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, p: i32, q: i32) -> i32 {
        let root = root.unwrap();
        // One walk over the tree records every node's parent. Values are
        // unique, so a value identifies its node; the root records none.
        let mut parent: HashMap<i32, i32> = HashMap::new();
        let mut stack: Vec<&TreeNode> = vec![&root];
        while let Some(node) = stack.pop() {
            for child in [node.left.as_deref(), node.right.as_deref()] {
                if let Some(child) = child {
                    parent.insert(child.val, node.val);
                    stack.push(child);
                }
            }
        }
        // Every node on the root-to-p chain, p and root included, is a
        // shared ancestor candidate: it is an ancestor of p by construction.
        let mut ancestors: HashSet<i32> = HashSet::new();
        let mut value = p;
        loop {
            ancestors.insert(value);
            if value == root.val {
                break;
            }
            value = *parent.get(&value).unwrap();
        }
        // Climb from q: the first candidate met is the deepest node whose
        // subtree covers both targets.
        value = q;
        while !ancestors.contains(&value) {
            value = *parent.get(&value).unwrap();
        }
        value
    }
}
