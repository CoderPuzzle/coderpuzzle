impl Solution {
    pub fn special_grid(n: i32) -> Vec<Vec<i32>> {
        // Bottom-up quadrant doubling. A special grid of level k is, in
        // reading order of the conditions, TL = 3·4^(k-1) + G(k-1) on the
        // left of the top half, TR = G(k-1) on the right, BL and BR follow
        // in the bottom half — so each step rebuilds every row of G(k-1)
        // into one top-half row and one bottom-half row, the top halves
        // grouped before the bottom halves.
        let mut grid: Vec<Vec<i32>> = vec![vec![0]];
        let mut step = 1_i32;
        for _ in 0..n {
            let rows = grid.len();
            let half = grid[0].len();
            let mut next = vec![vec![0_i32; 2 * half]; 2 * rows];
            for index in 0..rows {
                for c in 0..half {
                    next[index][c] = grid[index][c] + 3 * step;
                    next[index][c + half] = grid[index][c];
                    next[rows + index][c] = grid[index][c] + 2 * step;
                    next[rows + index][c + half] = grid[index][c] + step;
                }
            }
            grid = next;
            step *= 4;
        }
        grid
    }
}
