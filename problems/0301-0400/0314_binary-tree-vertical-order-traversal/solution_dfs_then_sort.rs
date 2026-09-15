impl Solution {
    pub fn vertical_order(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        // Pure collector: a root-first DFS (left before right) appends one
        // (column, row, value) record per node and defers all ordering to a
        // single sort afterwards.
        let mut triples: Vec<(i32, i32, i32)> = Vec::new();
        walk(root.as_deref(), 0, 0, &mut triples);
        // sort_by_key is stable, and the key stops at (column, row): within
        // one cell the records keep their walk order, and a left-before-
        // right walk visits same-depth nodes exactly in the statement's
        // left-to-right reading order — the value must not take part.
        triples.sort_by_key(|record| (record.0, record.1));
        let mut answer: Vec<Vec<i32>> = Vec::new();
        let mut start = 0usize;
        while start < triples.len() {
            let mut end = start;
            while end < triples.len() && triples[end].0 == triples[start].0 {
                end += 1;
            }
            answer.push(triples[start..end].iter().map(|record| record.2).collect());
            start = end;
        }
        answer
    }
}

// One (column, row, value) record per node, appended root-first and left
// before right; the recursion never nests deeper than the tree's height.
fn walk(node: Option<&TreeNode>, row: i32, col: i32, triples: &mut Vec<(i32, i32, i32)>) {
    if let Some(node) = node {
        triples.push((col, row, node.val));
        walk(node.left.as_deref(), row + 1, col - 1, triples);
        walk(node.right.as_deref(), row + 1, col + 1, triples);
    }
}
