use std::collections::HashSet;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn num_components(head: Option<Box<ListNode>>, nums: Vec<i32>) -> i32 {
        // O(1) membership tests: the set holds every value of nums once.
        let wanted: HashSet<i32> = nums.into_iter().collect();
        let mut components = 0;
        let mut previous_in = false;
        let mut link = head.as_deref();
        while let Some(node) = link {
            let current_in = wanted.contains(&node.val);
            // A component starts exactly where membership turns on: this
            // node is in nums and its predecessor was not. The initial
            // false flag folds the head into the same rule — no predecessor.
            if current_in && !previous_in {
                components += 1;
            }
            previous_in = current_in;
            link = node.next.as_deref();
        }
        components
    }
}
