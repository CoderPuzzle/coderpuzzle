impl Solution {
    pub fn get_maximum_gold(mut grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        let mut best = 0;
        for r in 0..rows {
            for c in 0..cols {
                if grid[r][c] > 0 {
                    best = best.max(walk(&mut grid, rows, cols, r, c));
                }
            }
        }
        best
    }
}

// walk collects the best continuation from (r, c). Zeroing on entry doubles
// as the visited mark; restore on exit.
fn walk(grid: &mut [Vec<i32>], rows: usize, cols: usize, r: usize, c: usize) -> i32 {
    let gold = grid[r][c];
    grid[r][c] = 0;
    let mut deepest = 0;
    for (nr, nc) in [(r.wrapping_sub(1), c), (r + 1, c), (r, c.wrapping_sub(1)), (r, c + 1)] {
        if nr < rows && nc < cols && grid[nr][nc] > 0 {
            deepest = deepest.max(walk(grid, rows, cols, nr, nc));
        }
    }
    grid[r][c] = gold;
    gold + deepest
}
