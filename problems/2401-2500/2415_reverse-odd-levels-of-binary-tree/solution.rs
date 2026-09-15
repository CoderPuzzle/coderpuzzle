// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Only values move — children stay attached — so reversing an odd
    // level means writing its value list back mirrored: first position
    // takes the last value, and so on inward. A frontier of &mut borrows
    // starts at the root and steps down one level per round, mirroring
    // each odd level's values on arrival. The tree is perfect, so one
    // presence check per node pair keeps the frontier free of empties
    // past the last level.
    pub fn reverse_odd_levels(mut root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        let mut row: Vec<&mut TreeNode> = Vec::new();
        if let Some(node) = root.as_deref_mut() {
            row.push(node);
        }
        let mut depth = 0;
        while !row.is_empty() {
            if depth % 2 == 1 {
                // Read the whole level's values out, then write them back
                // back-to-front — two disjoint phases, one node at a time,
                // which is what the borrow checker can prove.
                let values: Vec<i32> = row.iter().map(|node| node.val).collect();
                let last = values.len() - 1;
                for (index, node) in row.iter_mut().enumerate() {
                    node.val = values[last - index];
                }
            }
            let mut next: Vec<&mut TreeNode> = Vec::new();
            for node in row {
                if node.left.is_some() {
                    next.push(node.left.as_deref_mut().unwrap());
                    next.push(node.right.as_deref_mut().unwrap());
                }
            }
            row = next;
            depth += 1;
        }
        root
    }
}
