// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn construct_from_pre_post(preorder: Vec<i32>, postorder: Vec<i32>) -> Option<Box<TreeNode>> {
        // Value -> postorder index: makes the left subtree's size an O(1)
        // lookup instead of a scan. Values are unique, so a hit names the
        // one place the left subtree's postorder segment ends.
        let index: HashMap<i32, usize> = postorder.iter().enumerate().map(|(i, &v)| (v, i)).collect();
        build(&preorder, &index, 0, preorder.len(), 0)
    }
}

// Raises the subtree over the preorder range [low, high); its postorder
// segment starts at post_low. Half-open bounds keep the index arithmetic in
// usize: an empty range is low == high, so no bound can ever underflow, and
// the 30-node ceiling bounds the nesting at 30 calls — recursion is safe in
// this judge's every runtime.
fn build(pre: &[i32], index: &HashMap<i32, usize>, low: usize, high: usize, post_low: usize) -> Option<Box<TreeNode>> {
    if low >= high {
        // An empty range is a missing subtree.
        return None;
    }
    let mut node = TreeNode {
        val: pre[low],
        left: None,
        right: None,
    };
    if high - low == 1 {
        // The subtree is a lone leaf: no child split to find.
        return Some(Box::new(node));
    }
    // The value right behind the root roots the subtree that follows.
    // Postorder ends that subtree with its own root, so
    // [post_low, index[...]] is exactly the left subtree and its size is
    // one past that position.
    let left_size = index[&pre[low + 1]] + 1 - post_low;
    node.left = build(pre, index, low + 1, low + 1 + left_size, post_low);
    // Whatever remains is the right subtree. When the root really has one
    // child, the left range swallowed the whole remainder and this range
    // comes back empty — the only child stays on the left, the required
    // answer, with no branch needed.
    node.right = build(pre, index, low + 1 + left_size, high, post_low + left_size);
    Some(Box::new(node))
}
