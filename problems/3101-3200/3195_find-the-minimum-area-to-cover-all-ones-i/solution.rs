impl Solution {
    pub fn minimum_area(grid: Vec<Vec<i32>>) -> i32 {
        // Every 1 must lie inside the answer, so the rectangle is pinned to
        // the topmost, bottommost, leftmost and rightmost 1; any smaller box
        // would exclude one of those extreme cells. One sweep tracking the
        // four extremes settles it.
        let mut min_row = grid.len();
        let mut max_row: usize = usize::MAX;
        let mut min_col = grid[0].len();
        let mut max_col: usize = 0;
        for (i, row) in grid.iter().enumerate() {
            let Some(first) = row.iter().position(|&v| v == 1) else {
                continue;
            };
            let last = row.iter().rposition(|&v| v == 1).unwrap();
            min_row = min_row.min(i);
            max_row = i;
            min_col = min_col.min(first);
            max_col = max_col.max(last);
        }
        ((max_row - min_row + 1) * (max_col - min_col + 1)) as i32
    }
}
