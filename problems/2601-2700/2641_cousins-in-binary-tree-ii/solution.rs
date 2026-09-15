impl Solution {
    // A node's new value is (sum of its level) - (its own original value
    // plus its sibling's). Two-phase breadth-first passes read a whole level
    // of children with their original values first — recording where each
    // parent's sibling group ends — then write the cousin sums back group by
    // group. Iterative on purpose: chains can run 10^5 nodes deep, far past
    // comfortable recursion.
    pub fn replace_value_in_tree(mut root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        let mut row: Vec<&mut TreeNode> = Vec::new();
        if let Some(node) = root.as_deref_mut() {
            node.val = 0;
            row.push(node);
        }
        while !row.is_empty() {
            // Gather the next level's disjoint &mut borrows along with the
            // end offsets of each parent's sibling group.
            let mut children: Vec<&mut TreeNode> = Vec::new();
            let mut ends: Vec<usize> = Vec::new();
            let mut child_sum: i64 = 0;
            for node in row {
                if node.left.is_some() {
                    let child = node.left.as_deref_mut().unwrap();
                    child_sum += child.val as i64;
                    children.push(child);
                }
                if node.right.is_some() {
                    let child = node.right.as_deref_mut().unwrap();
                    child_sum += child.val as i64;
                    children.push(child);
                }
                ends.push(children.len());
            }
            // Read each group's original values before writing any of them.
            let mut index = 0usize;
            for end in ends {
                if end > index {
                    let pair_sum: i64 = children[index..end].iter().map(|c| c.val as i64).sum();
                    let new_value = child_sum - pair_sum;
                    for child in children[index..end].iter_mut() {
                        child.val = new_value as i32;
                    }
                }
                index = end;
            }
            row = children;
        }
        root
    }
}
