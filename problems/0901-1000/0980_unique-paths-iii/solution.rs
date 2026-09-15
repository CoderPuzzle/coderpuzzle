// A qualifying walk steps on every non-obstacle square exactly once and
// reaches the ending square last — a Hamiltonian path of the walkable
// squares, counted by walking every candidate. m * n is at most 20, so one
// integer is the visited set: bit r * n + c. The scan finds the start and
// builds `full`, the mask of every walkable square; a walk counts exactly
// when it steps onto the ending square with mask == full.
impl Solution {
    pub fn unique_paths_iii(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut full = 0u32;
        let mut start_r = 0usize;
        let mut start_c = 0usize;
        for i in 0..m {
            for j in 0..n {
                if grid[i][j] != -1 {
                    full |= 1 << (i * n + j);
                }
                if grid[i][j] == 1 {
                    start_r = i;
                    start_c = j;
                }
            }
        }
        dfs(&grid, m, n, start_r, start_c, 1 << (start_r * n + start_c), full)
    }
}

// No square may be walked twice, so meeting the ending square ends the
// walk whether or not it is complete. Guards run before each shift so the
// bit index never leaves the grid.
fn dfs(grid: &[Vec<i32>], m: usize, n: usize, r: usize, c: usize, mask: u32, full: u32) -> i32 {
    if grid[r][c] == 2 {
        return if mask == full { 1 } else { 0 };
    }
    let mut paths = 0;
    if r > 0 {
        let bit = 1 << ((r - 1) * n + c);
        if grid[r - 1][c] != -1 && (mask & bit) == 0 {
            paths += dfs(grid, m, n, r - 1, c, mask | bit, full);
        }
    }
    if r + 1 < m {
        let bit = 1 << ((r + 1) * n + c);
        if grid[r + 1][c] != -1 && (mask & bit) == 0 {
            paths += dfs(grid, m, n, r + 1, c, mask | bit, full);
        }
    }
    if c > 0 {
        let bit = 1 << (r * n + c - 1);
        if grid[r][c - 1] != -1 && (mask & bit) == 0 {
            paths += dfs(grid, m, n, r, c - 1, mask | bit, full);
        }
    }
    if c + 1 < n {
        let bit = 1 << (r * n + c + 1);
        if grid[r][c + 1] != -1 && (mask & bit) == 0 {
            paths += dfs(grid, m, n, r, c + 1, mask | bit, full);
        }
    }
    paths
}
