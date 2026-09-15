impl Solution {
    pub fn create_grid(m: i32, n: i32) -> Vec<String> {
        let (m, n) = (m as usize, n as usize);
        let mut grid = vec!["#".repeat(n - 1) + "."; m];
        grid[0] = ".".repeat(n);
        grid
    }
}
