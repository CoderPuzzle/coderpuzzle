impl Solution {
    pub fn count_pyramids(grid: Vec<Vec<i32>>) -> i32 {
        Self::count_direction(&grid, false) + Self::count_direction(&grid, true)
    }

    fn count_direction(grid: &[Vec<i32>], forward: bool) -> i32 {
        let rows = grid.len();
        let columns = grid[0].len();
        let mut toward_base = vec![0_i32; columns];
        let mut total = 0_i32;
        for offset in 0..rows {
            let row = if forward { offset } else { rows - 1 - offset };
            let mut current = vec![0_i32; columns];
            for column in 0..columns {
                if grid[row][column] == 0 {
                    continue;
                }
                current[column] = 1;
                if column > 0 && column + 1 < columns && toward_base[column] > 0 {
                    current[column] += toward_base[column - 1].min(toward_base[column + 1]);
                }
                total += current[column] - 1;
            }
            toward_base = current;
        }
        total
    }
}
