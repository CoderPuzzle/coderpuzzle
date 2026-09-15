impl Solution {
    pub fn check_valid(matrix: Vec<Vec<i32>>) -> bool {
        let size = matrix.len();
        for index in 0..size {
            let mut row_seen = vec![false; size + 1];
            let mut col_seen = vec![false; size + 1];
            for offset in 0..size {
                let row_value = matrix[index][offset] as usize;
                let col_value = matrix[offset][index] as usize;
                if row_seen[row_value] || col_seen[col_value] {
                    return false;
                }
                row_seen[row_value] = true;
                col_seen[col_value] = true;
            }
        }
        true
    }
}
