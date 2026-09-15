use std::collections::BTreeMap;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn vertical_traversal(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // One (column, row, value) record per node, gathered by an
        // explicit-stack DFS — no recursion, so a 1000-node chain cannot
        // exhaust any call stack.
        let mut cells: BTreeMap<i32, Vec<(i32, i32)>> = BTreeMap::new();
        let mut pending: Vec<(&TreeNode, i32, i32)> = Vec::new();
        if let Some(node) = root.as_deref() {
            pending.push((node, 0, 0));
        }
        while let Some((node, row, col)) = pending.pop() {
            cells.entry(col).or_default().push((row, node.val));
            if let Some(child) = node.right.as_deref() {
                pending.push((child, row + 1, col + 1));
            }
            if let Some(child) = node.left.as_deref() {
                pending.push((child, row + 1, col - 1));
            }
        }
        // Rows read top to bottom and values break the ties of nodes sharing
        // one cell; BTreeMap order runs the columns left to right.
        let mut answer: Vec<Vec<i32>> = Vec::new();
        for records in cells.values_mut() {
            records.sort();
            answer.push(records.iter().map(|&(_row, value)| value).collect());
        }
        answer
    }
}
