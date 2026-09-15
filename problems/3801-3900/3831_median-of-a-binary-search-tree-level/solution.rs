// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn level_median(root: Option<Box<TreeNode>>, level: i32) -> i32 {
        // Descend one frontier at a time: every pass takes the boxed
        // children out of the current level's nodes into the next
        // frontier, so after `level` passes the frontier IS the queried
        // level. If it empties first, that level does not exist and -1
        // is the answer. Ownership moves level by level — no recursion,
        // so a 200,000-node chain is as safe as a bushy tree.
        let mut frontier: Vec<Box<TreeNode>> = root.into_iter().collect();
        for _ in 0..level {
            if frontier.is_empty() {
                break;
            }
            let mut next: Vec<Box<TreeNode>> = Vec::with_capacity(2 * frontier.len());
            for node in frontier.into_iter() {
                if let Some(child) = node.left {
                    next.push(child);
                }
                if let Some(child) = node.right {
                    next.push(child);
                }
            }
            frontier = next;
        }
        // The upper median sits at index len / 2 of the sorted level
        // values: the exact middle for odd counts, the larger of the two
        // middle elements for even counts.
        let mut values: Vec<i32> = frontier.iter().map(|node| node.val).collect();
        values.sort_unstable();
        if values.is_empty() {
            -1
        } else {
            values[values.len() / 2]
        }
    }
}
