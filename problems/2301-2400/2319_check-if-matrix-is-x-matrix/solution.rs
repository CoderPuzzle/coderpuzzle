impl Solution {
    pub fn check_x_matrix(grid: Vec<Vec<i32>>) -> bool {
        let size = grid.len();
        for row in 0..size {
            for col in 0..size {
                if row == col || row + col == size - 1 {
                    if grid[row][col] == 0 {
                        return false;
                    }
                } else if grid[row][col] != 0 {
                    return false;
                }
            }
        }
        true
    }
}
