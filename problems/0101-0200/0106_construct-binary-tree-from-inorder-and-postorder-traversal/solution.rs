// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn build_tree(inorder: Vec<i32>, postorder: Vec<i32>) -> Option<Box<TreeNode>> {
        let n = inorder.len();
        if n == 0 {
            return None;
        }
        // Value -> inorder index: makes each split lookup O(1) instead of a
        // linear scan. Values are unique, so a hit is exactly one split point.
        let index: HashMap<i32, usize> = inorder.iter().enumerate().map(|(i, &v)| (v, i)).collect();
        // Postorder ends with the root, and the reversed array lists root,
        // right subtree, left subtree -- so a cursor walking postorder
        // backwards hands out subtree roots in exactly the order the frames
        // below claim them.
        let mut position = n - 1;
        // Arena of slots: the dummy at slot 0 lets the real root pass through
        // the same attach logic as every other node (the answer is the
        // dummy's left child), and each created node takes the next slot.
        let mut values = vec![0i32; n + 1];
        let mut left: Vec<Option<usize>> = vec![None; n + 1];
        let mut right: Vec<Option<usize>> = vec![None; n + 1];
        let mut next_slot = 1usize;
        // Frames are (parent slot, attach_left, low, high) over inorder
        // ranges. Popping a frame claims at most one root value from the
        // cursor, so an explicit stack -- not recursion -- drives the build:
        // the constraint ceiling allows a 3000-node chain, and recursion
        // that deep is not safe in every judge language.
        let mut stack: Vec<(usize, bool, usize, usize)> = vec![(0, true, 0, n)];
        while let Some((parent, attach_left, low, high)) = stack.pop() {
            if low >= high {
                // Empty inorder range <=> missing subtree.
                continue;
            }
            let value = postorder[position];
            position -= 1;
            let slot = next_slot;
            next_slot += 1;
            values[slot] = value;
            if attach_left {
                left[parent] = Some(slot);
            } else {
                right[parent] = Some(slot);
            }
            let mid = index[&value];
            // Inorder visits left, root, right: [low, mid) is the left
            // subtree and [mid + 1, high) the right. Left is pushed first
            // so the right frame pops -- and its root is consumed -- first.
            stack.push((slot, true, low, mid));
            stack.push((slot, false, mid + 1, high));
        }
        // Assemble the owned tree: a child always has a higher slot than its
        // parent, so wrapping real slots in reverse order finds every child
        // boxed already (this port cannot keep mutable aliases on a stack).
        // The dummy itself is never assembled -- its left child IS the answer.
        let mut nodes: Vec<Option<Box<TreeNode>>> = (0..=n).map(|_| None).collect();
        for slot in (1..=n).rev() {
            nodes[slot] = Some(Box::new(TreeNode {
                val: values[slot],
                left: left[slot].and_then(|child| nodes[child].take()),
                right: right[slot].and_then(|child| nodes[child].take()),
            }));
        }
        left[0].and_then(|root| nodes[root].take())
    }
}
