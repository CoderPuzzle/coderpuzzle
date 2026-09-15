impl Solution {
    pub fn satisfies_conditions(grid: Vec<Vec<i32>>) -> bool {
        // A grid meets both conditions exactly when every column is
        // constant and neighbouring columns differ. Once a column is
        // verified constant, comparing just its top cell with the next
        // column's top cell polices every vertical pair of the horizontal
        // rule at once, so one column-wise sweep suffices.
        for j in 0..grid[0].len() {
            for i in 1..grid.len() {
                if grid[i][j] != grid[0][j] {
                    return false;
                }
            }
            if j + 1 < grid[0].len() && grid[0][j] == grid[0][j + 1] {
                return false;
            }
        }
        true
    }
}
