impl Solution {
    pub fn possible_to_stamp(grid: Vec<Vec<i32>>, stampHeight: i32, stampWidth: i32) -> bool {
        let rows = grid.len();
        let columns = grid[0].len();
        let height = stampHeight as usize;
        let width = stampWidth as usize;
        let mut occupied = vec![vec![0; columns + 1]; rows + 1];
        for row in 0..rows {
            for column in 0..columns {
                occupied[row + 1][column + 1] =
                    grid[row][column] + occupied[row][column + 1] + occupied[row + 1][column] - occupied[row][column];
            }
        }

        let mut difference = vec![vec![0; columns + 1]; rows + 1];
        if height <= rows && width <= columns {
            for top in 0..=rows - height {
                let bottom = top + height;
                for left in 0..=columns - width {
                    let right = left + width;
                    let total =
                        occupied[bottom][right] - occupied[top][right] - occupied[bottom][left] + occupied[top][left];
                    if total == 0 {
                        difference[top][left] += 1;
                        difference[bottom][left] -= 1;
                        difference[top][right] -= 1;
                        difference[bottom][right] += 1;
                    }
                }
            }
        }

        for row in 0..rows {
            for column in 0..columns {
                if row > 0 {
                    difference[row][column] += difference[row - 1][column];
                }
                if column > 0 {
                    difference[row][column] += difference[row][column - 1];
                }
                if row > 0 && column > 0 {
                    difference[row][column] -= difference[row - 1][column - 1];
                }
                if grid[row][column] == 0 && difference[row][column] == 0 {
                    return false;
                }
            }
        }
        true
    }
}
