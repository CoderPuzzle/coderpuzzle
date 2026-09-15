impl Solution {
    pub fn unique_paths(m: i32, n: i32) -> i32 {
        let m = m as usize;
        let n = n as usize;
        // One rolling row, seeded with the all-ones counts of the first row.
        let mut row = vec![1i32; n];
        for _ in 1..m {
            // row[j] still holds the count from the cell above while row[j-1]
            // was already rewritten this pass, so += applies paths = up + left.
            for j in 1..n {
                row[j] += row[j - 1];
            }
        }
        row[n - 1]
    }
}
