impl Solution {
    pub fn restore_matrix(row_sum: Vec<i32>, col_sum: Vec<i32>) -> Vec<Vec<i32>> {
        let rows = row_sum.len();
        let cols = col_sum.len();
        let mut remaining_row = row_sum;
        let mut remaining_col = col_sum;
        let mut matrix = vec![vec![0; cols]; rows];
        for i in 0..rows {
            for j in 0..cols {
                let value = remaining_row[i].min(remaining_col[j]);
                matrix[i][j] = value;
                remaining_row[i] -= value;
                remaining_col[j] -= value;
            }
        }
        matrix
    }
}
