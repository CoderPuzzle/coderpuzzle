// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashSet;

impl Solution {
    pub fn find_target(root: Option<Box<TreeNode>>, k: i32) -> bool {
        // A value pairs with k minus itself, so the whole question is set
        // membership: keep every value already visited in a hash set, and
        // each new node learns with one lookup whether its partner came
        // earlier. The lookup comes before the insert — the ordering that
        // forbids a node pairing with itself, so a k equal to twice a
        // value that occurs once stays false. The visiting order is
        // irrelevant: any traversal that reaches every node sees one
        // member of a summing pair before the other, so a plain preorder
        // returns true at the first hit and false only after the whole
        // tree is exhausted. The walk carries its own stack of nodes: the
        // tree may be a single 10^4-node chain, whose walk would nest
        // 10000 calls — past the call stack's hold, and past the
        // recursive drop of its boxes.
        let mut seen: HashSet<i32> = HashSet::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push(node);
        }
        while let Some(node) = stack.pop() {
            if seen.contains(&(k - node.val)) {
                return true;
            }
            seen.insert(node.val);
            if let Some(child) = node.left.as_deref() {
                stack.push(child);
            }
            if let Some(child) = node.right.as_deref() {
                stack.push(child);
            }
        }
        false
    }
}
