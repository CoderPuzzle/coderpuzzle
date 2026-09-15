// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn vertical_traversal(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // Pure collector: a root-first DFS (left before right, explicit
        // stack, no recursion) appends one (column, row, value) record per
        // node and keeps no answer structure at all.
        let mut triples: Vec<(i32, i32, i32)> = Vec::new();
        let mut pending: Vec<(&TreeNode, i32, i32)> = Vec::new();
        if let Some(node) = root.as_deref() {
            pending.push((node, 0, 0));
        }
        while let Some((node, row, col)) = pending.pop() {
            triples.push((col, row, node.val));
            if let Some(child) = node.right.as_deref() {
                pending.push((child, row + 1, col + 1));
            }
            if let Some(child) = node.left.as_deref() {
                pending.push((child, row + 1, col - 1));
            }
        }
        // One sort settles every ordering at once: columns left to right,
        // rows top to bottom, and values breaking the ties of nodes that
        // share one cell — tuple order already compares the three
        // components in that priority. The answer is then just runs of
        // equal columns.
        triples.sort();
        let mut answer: Vec<Vec<i32>> = Vec::new();
        let mut start = 0usize;
        while start < triples.len() {
            let col = triples[start].0;
            let mut end = start;
            while end < triples.len() && triples[end].0 == col {
                end += 1;
            }
            answer.push(triples[start..end].iter().map(|record| record.2).collect());
            start = end;
        }
        answer
    }
}
