use std::collections::{HashMap, HashSet};

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, p: i32, q: i32) -> i32 {
        // The original hands p and q as node references that each carry a
        // parent pointer, with no root given at all. Here the tree
        // arrives as root plus the two target values instead, so the
        // first step recovers what parent would have given directly: one
        // iterative pre-order pass over borrowed references builds a
        // value -> parent-value map. Node values are unique, so a value
        // is a safe, hashable key.
        let root_ref = root.as_deref().unwrap();
        let mut parent_of: HashMap<i32, Option<i32>> = HashMap::new();
        parent_of.insert(root_ref.val, None);
        let mut stack: Vec<&TreeNode> = vec![root_ref];
        while let Some(node) = stack.pop() {
            if let Some(left) = node.left.as_deref() {
                parent_of.insert(left.val, Some(node.val));
                stack.push(left);
            }
            if let Some(right) = node.right.as_deref() {
                parent_of.insert(right.val, Some(node.val));
                stack.push(right);
            }
        }
        // Walk p up to the root, collecting every value on that path —
        // exactly the "store the path from p" step the original hints at.
        let mut ancestors: HashSet<i32> = HashSet::new();
        let mut val = p;
        loop {
            ancestors.insert(val);
            match parent_of[&val] {
                Some(next) => val = next,
                None => break,
            }
        }
        // Walk q up until it lands on a value already seen from p; that
        // is the lowest shared ancestor. This also handles either target
        // already being the other's ancestor, since the starting value
        // is checked before climbing.
        let mut val = q;
        while !ancestors.contains(&val) {
            val = parent_of[&val].unwrap();
        }
        val
    }
}
