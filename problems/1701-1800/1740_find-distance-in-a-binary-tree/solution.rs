// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    // One iterative pass — an explicit stack, never recursion, since a
    // skewed tree runs 10^4 nodes deep — records each value's depth and
    // parent. Values are unique, so a value keys both maps. The distance
    // then resolves through the lowest common ancestor: lift the deeper
    // of p and q to the other's depth, walk both up in lockstep until
    // they meet — that meeting point is the LCA — and return depth[p] +
    // depth[q] - 2 * depth[lca], each leg of the path counted once.
    // p == q needs no special case: the lifts make no move, the walk
    // finds the two already equal, and the formula cancels to 0. The
    // root records itself as its own parent; no climb ever passes the
    // LCA, which is at the latest the root, so the sentinel is never
    // followed.
    pub fn find_distance(root: Option<Box<TreeNode>>, p: i32, q: i32) -> i32 {
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
        let (mut a, mut b) = (p, q);
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
        depth_of[&p] + depth_of[&q] - 2 * depth_of[&a]
    }
}
