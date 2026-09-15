use std::collections::{HashMap, HashSet};

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, p: i32, q: i32) -> Option<Box<TreeNode>> {
        // Iterative pre-order build of a value -> parent-value map (and a
        // value -> node lookup) in one pass over borrowed references. Node
        // values are unique, so a value serves as a stable, hashable key
        // everywhere. Once built, p and q's presence is a plain membership
        // check against node_of — this is the existence check, done for
        // free by the same walk that will drive the LCA search.
        let root_ref = root.as_deref()?;
        let mut node_of: HashMap<i32, &TreeNode> = HashMap::new();
        let mut parent_of: HashMap<i32, Option<i32>> = HashMap::new();
        parent_of.insert(root_ref.val, None);
        let mut stack: Vec<&TreeNode> = vec![root_ref];
        while let Some(node) = stack.pop() {
            node_of.insert(node.val, node);
            if let Some(left) = node.left.as_deref() {
                parent_of.insert(left.val, Some(node.val));
                stack.push(left);
            }
            if let Some(right) = node.right.as_deref() {
                parent_of.insert(right.val, Some(node.val));
                stack.push(right);
            }
        }
        if !node_of.contains_key(&p) || !node_of.contains_key(&q) {
            return None;
        }
        // Walk p up to the root, collecting every value on that path.
        let mut ancestors: HashSet<i32> = HashSet::new();
        let mut val = p;
        loop {
            ancestors.insert(val);
            match parent_of[&val] {
                Some(next) => val = next,
                None => break,
            }
        }
        // Walk q up until it lands on a value already seen from p; that is
        // the lowest shared ancestor (this also handles p == q and either
        // one already being the other's ancestor, since the starting value
        // is checked before climbing). TreeNode derives Clone, so the
        // match is handed back as a freshly cloned subtree.
        let mut val = q;
        while !ancestors.contains(&val) {
            val = parent_of[&val].unwrap();
        }
        Some(Box::new(node_of[&val].clone()))
    }
}
