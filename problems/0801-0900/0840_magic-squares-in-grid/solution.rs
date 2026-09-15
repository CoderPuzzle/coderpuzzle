impl Solution {
    pub fn num_magic_squares_inside(grid: Vec<Vec<i32>>) -> i32 {
        // Every 3 x 3 window is judged independently, so the scan visits
        // each window's top-left corner and tests it; a grid shorter than
        // three rows or columns leaves the sweep empty.
        let rows = grid.len();
        let cols = grid[0].len();
        let mut count = 0;
        for r in 0..rows.saturating_sub(2) {
            for c in 0..cols.saturating_sub(2) {
                if is_magic(&grid, r, c) {
                    count += 1;
                }
            }
        }
        count
    }
}

// Nine distinct values 1..9 total 45, so the four lines through the
// center add to 4*15 = 45 + 3*center — the center must be 5. One
// comparison clears most windows; survivors need every row, column, and
// diagonal at 15, plus a seen-set for distinctness and range: the sums
// alone also bless duplicate and out-of-range arrangements.
fn is_magic(grid: &[Vec<i32>], r: usize, c: usize) -> bool {
    if grid[r + 1][c + 1] != 5 {
        return false;
    }
    for i in 0..3 {
        if grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2] != 15 {
            return false;
        }
        if grid[r][c + i] + grid[r + 1][c + i] + grid[r + 2][c + i] != 15 {
            return false;
        }
    }
    if grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2] != 15 {
        return false;
    }
    if grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c] != 15 {
        return false;
    }
    let mut seen = [false; 10];
    for i in 0..3 {
        for j in 0..3 {
            let v = grid[r + i][c + j];
            if v < 1 || v > 9 || seen[v as usize] {
                return false;
            }
            seen[v as usize] = true;
        }
    }
    true
}
