// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    // One iterative pass — an explicit stack, never recursion, since a
    // skewed tree runs 10^4 nodes deep — records each value's depth and
    // parent. Values are unique, so a value keys both maps. The answer
    // then folds pairwise over the query values: hold the running LCA
    // candidate, and for each further value lift the deeper of the two
    // to the other's depth, then walk both up in lockstep until they
    // meet. The LCA is associative — the LCA of the whole list is the
    // LCA of the running candidate and each new value — so the fold
    // lands on the shared ancestor, and a one-value query returns that
    // value untouched. The root records itself as its own parent; no
    // climb ever passes the LCA, which is at the latest the root, so
    // the sentinel is never followed.
    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, nodes: Vec<i32>) -> i32 {
        let mut depth_of: HashMap<i32, i32> = HashMap::new();
        let mut parent_of: HashMap<i32, i32> = HashMap::new();
        let mut pending: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            depth_of.insert(node.val, 0);
            parent_of.insert(node.val, node.val);
            pending.push(node);
        }
        while let Some(node) = pending.pop() {
            let child_depth = depth_of[&node.val] + 1;
            for child in [node.left.as_deref(), node.right.as_deref()] {
                if let Some(child) = child {
                    depth_of.insert(child.val, child_depth);
                    parent_of.insert(child.val, node.val);
                    pending.push(child);
                }
            }
        }
        let mut lca = nodes[0];
        for &value in &nodes[1..] {
            let (mut a, mut b) = (lca, value);
            while depth_of[&a] > depth_of[&b] {
                a = parent_of[&a];
            }
            while depth_of[&b] > depth_of[&a] {
                b = parent_of[&b];
            }
            while a != b {
                a = parent_of[&a];
                b = parent_of[&b];
            }
            lca = a;
        }
        lca
    }
}
