// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn construct_maximum_binary_tree(nums: Vec<i32>) -> Option<Box<TreeNode>> {
        // The half-built tree's right spine holds exactly the still-open
        // maxima — values strictly decreasing from the root down — so it
        // lives on a stack of not-yet-linked boxes. A new value dominates
        // every smaller top, and each popped node takes the previously
        // popped, smaller chain as its right subtree — the link the
        // shared-reference form may simply overwrite later. The last one
        // out (the run's largest) becomes the new node's left subtree.
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let mut last: Option<Box<TreeNode>> = None;
        for value in nums {
            while stack.last().map_or(false, |top| top.val < value) {
                let mut popped = stack.pop().unwrap();
                popped.right = last.take();
                last = Some(popped);
            }
            let node = Box::new(TreeNode {
                val: value,
                left: last.take(),
                right: None,
            });
            stack.push(node);
        }
        // The array ends: unwind the surviving spine with the same move —
        // each node takes the smaller chain as its right subtree — so the
        // final one out is the largest value ever seen, the root.
        while let Some(mut popped) = stack.pop() {
            popped.right = last.take();
            last = Some(popped);
        }
        last
    }
}
