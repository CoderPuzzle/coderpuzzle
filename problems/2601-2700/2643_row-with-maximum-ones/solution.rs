impl Solution {
    pub fn row_and_maximum_ones(mat: Vec<Vec<i32>>) -> Vec<i32> {
        // One scan carries the best (count, row) pair seen so far; only a
        // strictly greater count replaces the incumbent, so among tied rows
        // the smallest index automatically survives.
        let mut best_row = 0usize;
        let mut best_count = -1i32;
        for (row_index, row) in mat.iter().enumerate() {
            let mut count = 0i32;
            for &value in row {
                if value == 1 {
                    count += 1;
                }
            }
            if count > best_count {
                best_count = count;
                best_row = row_index;
            }
        }
        vec![best_row as i32, best_count]
    }
}
