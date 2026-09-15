impl Solution {
    pub fn max_increasing_cells(mat: Vec<Vec<i32>>) -> i32 {
        // Chains only ever move to strictly greater values, so sweeping the
        // distinct values in ascending order lets every cell inherit the
        // best chain that already ends in its row or column among smaller
        // values. Cells sharing one value form a read-then-write batch:
        // their answers come from the row/column state before the batch,
        // and the maxima absorb the whole batch afterwards, since an
        // equal-value cell can never continue a chain.
        let rows = mat.len();
        let cols = mat[0].len();
        let mut cells: Vec<(i32, usize, usize)> = Vec::with_capacity(rows * cols);
        for (r, row) in mat.iter().enumerate() {
            for (c, &v) in row.iter().enumerate() {
                cells.push((v, r, c));
            }
        }
        cells.sort_by_key(|&(v, _, _)| v);
        let mut row_max = vec![0i32; rows];
        let mut col_max = vec![0i32; cols];
        let mut best = 0i32;
        let mut i = 0;
        while i < cells.len() {
            let mut j = i; // run-length batch equal values: equal cells never chain
            while j < cells.len() && cells[j].0 == cells[i].0 {
                j += 1;
            }
            let mut batch: Vec<(i32, usize, usize)> = Vec::new();
            for &(_, r, c) in &cells[i..j] {
                // one more than the best chain ending at a smaller value
                let length = std::cmp::max(row_max[r], col_max[c]) + 1;
                batch.push((length, r, c));
                if best < length {
                    best = length;
                }
            }
            for (length, r, c) in batch {
                if row_max[r] < length {
                    row_max[r] = length;
                }
                if col_max[c] < length {
                    col_max[c] = length;
                }
            }
            i = j;
        }
        best
    }
}
