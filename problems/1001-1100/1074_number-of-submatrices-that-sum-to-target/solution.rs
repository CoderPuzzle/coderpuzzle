use std::collections::HashMap;

impl Solution {
    pub fn num_submatrix_sum_target(matrix: Vec<Vec<i32>>, target: i32) -> i32 {
        let rows = matrix.len();
        let cols = matrix[0].len();

        let mut vpref = vec![vec![0i64; cols]; rows + 1];
        for r in 0..rows {
            for c in 0..cols {
                vpref[r + 1][c] = vpref[r][c] + matrix[r][c] as i64;
            }
        }

        let mut count: i64 = 0;
        for top in 0..rows {
            for bottom in top..rows {
                let mut hist: HashMap<i64, i64> = HashMap::new();
                hist.insert(0, 1);
                let mut running: i64 = 0;
                for c in 0..cols {
                    let col_sum = vpref[bottom + 1][c] - vpref[top][c];
                    running += col_sum;
                    count += hist.get(&(running - target as i64)).copied().unwrap_or(0);
                    *hist.entry(running).or_insert(0) += 1;
                }
            }
        }
        count as i32
    }
}
