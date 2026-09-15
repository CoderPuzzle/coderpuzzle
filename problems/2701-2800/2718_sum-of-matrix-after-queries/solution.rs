impl Solution {
    pub fn matrix_sum_queries(n: i32, queries: Vec<Vec<i32>>) -> i64 {
        // Sum reaches n*n*val = 1e13, past I32_MAX; accumulate in 64-bit.
        let n = n as usize;
        let mut seen_rows = vec![false; n];
        let mut seen_cols = vec![false; n];
        let mut remaining_rows = n as i64;
        let mut remaining_cols = n as i64;
        let mut total: i64 = 0;
        for query in queries.iter().rev() {
            let kind = query[0];
            let index = query[1] as usize;
            let value = query[2] as i64;
            if kind == 0 {
                if seen_rows[index] {
                    continue;
                }
                seen_rows[index] = true;
                remaining_rows -= 1;
                total += value * remaining_cols;
            } else {
                if seen_cols[index] {
                    continue;
                }
                seen_cols[index] = true;
                remaining_cols -= 1;
                total += value * remaining_rows;
            }
        }
        total
    }
}
