impl Solution {
    pub fn count_local_maximums(matrix: Vec<Vec<i32>>) -> i32 {
        let rows = matrix.len();
        let columns = matrix[0].len();
        let mut positions = vec![Vec::<(usize, usize)>::new(); 201];
        for row in 0..rows {
            for column in 0..columns {
                let value = matrix[row][column] as usize;
                if value != 0 {
                    positions[value].push((row, column));
                }
            }
        }
        let mut answer = 0;
        for value in 1..=200_usize {
            if positions[value].is_empty() {
                continue;
            }
            let mut prefix = vec![vec![0_i32; columns + 1]; rows + 1];
            for row in 0..rows {
                let mut running = 0;
                for column in 0..columns {
                    running += (matrix[row][column] as usize > value) as i32;
                    prefix[row + 1][column + 1] = prefix[row][column + 1] + running;
                }
            }
            for &(row, column) in &positions[value] {
                let top = row.saturating_sub(value);
                let bottom = (row + value).min(rows - 1);
                let left = column.saturating_sub(value);
                let right = (column + value).min(columns - 1);
                let mut greater = prefix[bottom + 1][right + 1] - prefix[top][right + 1] - prefix[bottom + 1][left]
                    + prefix[top][left];
                for corner_row in [row as isize - value as isize, row as isize + value as isize] {
                    for corner_column in [column as isize - value as isize, column as isize + value as isize] {
                        if corner_row >= 0
                            && corner_row < rows as isize
                            && corner_column >= 0
                            && corner_column < columns as isize
                            && matrix[corner_row as usize][corner_column as usize] as usize > value
                        {
                            greater -= 1;
                        }
                    }
                }
                if greater == 0 {
                    answer += 1;
                }
            }
        }
        answer
    }
}
