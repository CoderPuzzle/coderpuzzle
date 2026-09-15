impl Solution {
    pub fn first_complete_index(arr: Vec<i32>, mat: Vec<Vec<i32>>) -> i32 {
        // Precompute where every value lives, then replay arr bumping each
        // cell's row and column counter; a counter reaching its width or
        // height means that line just finished painting.
        let rows = mat.len();
        let columns = mat[0].len();
        let mut row_of = vec![0usize; rows * columns + 1];
        let mut column_of = vec![0usize; rows * columns + 1];
        for r in 0..rows {
            for c in 0..columns {
                row_of[mat[r][c] as usize] = r;
                column_of[mat[r][c] as usize] = c;
            }
        }
        let mut row_fill = vec![0usize; rows];
        let mut column_fill = vec![0usize; columns];
        for (index, &value) in arr.iter().enumerate() {
            let value = value as usize;
            row_fill[row_of[value]] += 1;
            if row_fill[row_of[value]] == columns {
                return index as i32;
            }
            column_fill[column_of[value]] += 1;
            if column_fill[column_of[value]] == rows {
                return index as i32;
            }
        }
        -1
    }
}
