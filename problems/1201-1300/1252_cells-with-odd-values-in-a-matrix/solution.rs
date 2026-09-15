impl Solution {
    pub fn odd_cells(m: i32, n: i32, indices: Vec<Vec<i32>>) -> i32 {
        let (m, n) = (m as usize, n as usize);
        let mut row_odd = vec![false; m];
        let mut col_odd = vec![false; n];
        for rc in &indices {
            // Only parity survives; the cell value is row count + column count.
            row_odd[rc[0] as usize] = !row_odd[rc[0] as usize];
            col_odd[rc[1] as usize] = !col_odd[rc[1] as usize];
        }
        let odd_rows = row_odd.iter().filter(|&&b| b).count() as i32;
        let odd_cols = col_odd.iter().filter(|&&b| b).count() as i32;
        odd_rows * (n as i32 - odd_cols) + (m as i32 - odd_rows) * odd_cols
    }
}
