// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn equal_to_descendants(root: Option<Box<TreeNode>>) -> i32 {
        // A reverse preorder walk visits children before parents, so
        // processing the collected nodes back-to-front lets each node's
        // subtree sum be built from its children's already-computed sums.
        // A node counts when its value equals the sum of its descendants,
        // i.e. its subtree sum minus its own value. The traversal is fully
        // iterative, so a 10^5-deep skewed tree cannot overflow any stack.
        // Subtree sums reach 10^5 * 10^5 = 10^10, so they need 64 bits.
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut pending: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            pending.push(node);
        }
        while let Some(node) = pending.pop() {
            order.push(node);
            if let Some(right) = node.right.as_deref() {
                pending.push(right);
            }
            if let Some(left) = node.left.as_deref() {
                pending.push(left);
            }
        }
        // Values need not be unique, so the map is keyed by the node's
        // address rather than its value.
        let mut subtree: HashMap<*const TreeNode, i64> = HashMap::new();
        let mut count = 0;
        for node in order.into_iter().rev() {
            let left = node.left.as_deref().map_or(0i64, |c| subtree[&(c as *const TreeNode)]);
            let right = node.right.as_deref().map_or(0i64, |c| subtree[&(c as *const TreeNode)]);
            let total = node.val as i64 + left + right;
            subtree.insert(node as *const TreeNode, total);
            if node.val as i64 == total - node.val as i64 {
                count += 1;
            }
        }
        count
    }
}
