impl Solution {
    pub fn generate(num_rows: i32) -> Vec<Vec<i32>> {
        let n = num_rows as usize;
        // The triangle defines its own recurrence: row 0 is a lone 1, and every
        // later row carries a 1 at each end with each interior cell the sum of
        // the two cells directly above it. Building top-down means the row
        // above is already complete when any of its sums are read.
        let mut rows: Vec<Vec<i32>> = Vec::with_capacity(n);
        rows.push(vec![1]);
        for i in 1..n {
            let above = &rows[i - 1];
            let mut row = vec![1];
            // Interior cell j is above[j - 1] + above[j]: the two cells that
            // touch it from directly above, with the edge 1s supplying the
            // missing neighbors of the outermost interior cells.
            for j in 1..i {
                row.push(above[j - 1] + above[j]);
            }
            row.push(1);
            rows.push(row);
        }
        rows
    }
}
