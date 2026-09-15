// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    // A same-value path reaches some highest node and falls into at most
    // two arms, so every node can summarize its subtree in one number: the
    // length, in edges, of the longest downward path of its own value
    // leaving it. Arms are settled children-first and a running maximum
    // over all bend points — the sum of a node's two arms — is the answer.
    // The walk carries its own stack: the constraints allow a 1000-deep
    // same-value chain, and recursion would nest a thousand frames — past
    // CPython's default limit and over the 512k stacks the judge hands
    // Java and Node.
    pub fn longest_univalue_path(root: Option<Box<TreeNode>>) -> i32 {
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push(node);
        }
        while let Some(node) = stack.pop() {
            order.push(node);
            if let Some(child) = node.left.as_deref() {
                stack.push(child);
            }
            if let Some(child) = node.right.as_deref() {
                stack.push(child);
            }
        }

        // Pre-order collection puts every parent before its descendants, so
        // the reversed walk is post-order: a node's children's arms are
        // always already in the map when it looks them up. Arms are keyed by
        // node address — every tree node is distinct.
        let mut arms: HashMap<*const TreeNode, i32> = HashMap::new();
        let mut best = 0;
        for node in order.iter().rev() {
            let node = *node;
            let left = match node.left.as_deref() {
                Some(child) if child.val == node.val => arms[&(child as *const TreeNode)] + 1,
                _ => 0,
            };
            let right = match node.right.as_deref() {
                Some(child) if child.val == node.val => arms[&(child as *const TreeNode)] + 1,
                _ => 0,
            };
            let longer = if left > right { left } else { right };
            arms.insert(node as *const TreeNode, longer);
            if left + right > best {
                best = left + right;
            }
        }
        best
    }
}
