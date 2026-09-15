// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn find_mode(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // Counting modes never needed the BST ordering: the modes are a
        // property of the multiset of values, whatever order a walk meets
        // them in. So this version takes the tree as an ordinary container
        // — a stack of borrowed nodes pops, tallies into a HashMap keyed
        // by the value itself, and pushes the children — and the map, not
        // adjacency, does the bookkeeping. The walk stays iterative: the
        // tree may be a single 10^4-node chain, whose traversal would
        // nest 10000 calls — past the call stack's hold, and past the
        // recursive drop of its boxes.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(top) = root.as_deref() {
            stack.push(top);
        }
        while let Some(node) = stack.pop() {
            *counts.entry(node.val).or_insert(0) += 1;
            if let Some(child) = node.left.as_deref() {
                stack.push(child);
            }
            if let Some(child) = node.right.as_deref() {
                stack.push(child);
            }
        }

        // One pass over the map finds the largest count; a second collects
        // every value that reaches it. A HashMap iterates in arbitrary
        // order — the ascending order the streak walk gets for free from
        // inorder is absent here — so the survivors are sorted once at the
        // end. (`unwrap_or` only covers the empty tree the constraints
        // rule out.)
        let best = *counts.values().max().unwrap_or(&0);
        let mut modes: Vec<i32> = counts
            .into_iter()
            .filter(|&(_, count)| count == best)
            .map(|(value, _)| value)
            .collect();
        modes.sort_unstable();
        modes
    }
}
