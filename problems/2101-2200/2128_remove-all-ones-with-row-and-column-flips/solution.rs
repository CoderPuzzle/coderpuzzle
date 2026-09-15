impl Solution {
    pub fn remove_ones(grid: Vec<Vec<i32>>) -> bool {
        for row in 0..grid.len() {
            for column in 0..grid[0].len() {
                if grid[row][column] ^ grid[row][0] ^ grid[0][column] ^ grid[0][0] != 0 {
                    return false;
                }
            }
        }
        true
    }
}
