impl Solution {
    pub fn check_valid_grid(grid: Vec<Vec<i32>>) -> bool {
        // The configuration is valid exactly when visit 0 sits at the
        // top-left cell and every pair of consecutive visits lands a
        // knight move apart. Map each visit number to its cell, then
        // verify the deltas pairwise with the arithmetic move test
        // (one step in one axis, two steps in the other).
        if grid[0][0] != 0 {
            return false;
        }
        let n = grid.len();
        let mut pos: Vec<(usize, usize)> = vec![(0, 0); n * n];
        for r in 0..n {
            for c in 0..n {
                pos[grid[r][c] as usize] = (r, c);
            }
        }
        for step in 1..n * n {
            let dr = pos[step].0.abs_diff(pos[step - 1].0);
            let dc = pos[step].1.abs_diff(pos[step - 1].1);
            if (dr != 1 || dc != 2) && (dr != 2 || dc != 1) {
                return false;
            }
        }
        true
    }
}
