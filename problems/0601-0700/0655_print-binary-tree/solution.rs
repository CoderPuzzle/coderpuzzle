// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn print_tree(root: Option<Box<TreeNode>>) -> Vec<Vec<String>> {
        // The layout is pinned before any cell is written: rows = height + 1,
        // columns = 2^(height+1) - 1, children stepping 2^(height-r-1) columns
        // sideways of their parent. So a first pass measures the tree's
        // height — in edges, the unit the formulas are stated in — on an
        // explicit stack of shared borrows: the placement formulas consume
        // it, so guessing it wrong would shift every cell in the grid.
        let root_ref = root.as_deref().unwrap();
        let mut height: i32 = 0;
        let mut measure: Vec<(&TreeNode, i32)> = vec![(root_ref, 0)];
        while let Some((node, depth)) = measure.pop() {
            if depth > height {
                height = depth;
            }
            if let Some(left) = node.left.as_deref() {
                measure.push((left, depth + 1));
            }
            if let Some(right) = node.right.as_deref() {
                measure.push((right, depth + 1));
            }
        }
        // Second pass: the grid is born as every cell "" (String::new), the
        // root goes to the exact middle of the top row, and untouched cells
        // simply keep their "" — the empties are the layout: the matrix is
        // as wide as the deepest path alone, not as the node count.
        let rows = (height + 1) as usize;
        let cols = (1usize << (height + 1) as usize) - 1;
        let mut res = vec![vec![String::new(); cols]; rows];
        let mut place: Vec<(&TreeNode, usize, usize)> = vec![(root_ref, 0, (cols - 1) / 2)];
        while let Some((node, r, c)) = place.pop() {
            res[r][c] = node.val.to_string();
            if node.left.is_some() || node.right.is_some() {
                // An internal node always sits above the last row, so the
                // exponent height - r - 1 is never negative.
                let offset = 1usize << (height as usize - r - 1);
                if let Some(left) = node.left.as_deref() {
                    place.push((left, r + 1, c - offset));
                }
                if let Some(right) = node.right.as_deref() {
                    place.push((right, r + 1, c + offset));
                }
            }
        }
        res
    }
}
