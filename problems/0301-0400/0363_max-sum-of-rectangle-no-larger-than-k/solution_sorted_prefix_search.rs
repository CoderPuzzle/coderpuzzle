impl Solution {
    pub fn max_sum_submatrix(matrix: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = matrix.len();
        let n = matrix[0].len();
        let k = k as i64;
        let mut best: Option<i64> = None;
        for top in 0..m {
            // col_sum[c] = sum of column c between rows top..bottom, so
            // extending the bottom row is one O(n) update; any rectangle
            // in this row pair is a contiguous subarray of col_sum.
            let mut col_sum = vec![0i64; n];
            for bottom in top..m {
                for c in 0..n {
                    col_sum[c] += matrix[bottom][c] as i64;
                }
                let mut prefix: i64 = 0;
                // 0 seeded so a subarray starting at the first column counts.
                let mut prefixes: Vec<i64> = vec![0];
                for c in 0..n {
                    prefix += col_sum[c];
                    // Subarray sum = prefix - earlier prefix; the smallest
                    // earlier >= prefix - k maximizes it while staying <= k.
                    let target = prefix - k;
                    let position = prefixes.partition_point(|&x| x < target);
                    if position < prefixes.len() {
                        let candidate = prefix - prefixes[position];
                        if best.is_none() || candidate > best.unwrap() {
                            best = Some(candidate);
                        }
                    }
                    // Keep the list sorted for the next query.
                    let at = prefixes.partition_point(|&x| x < prefix);
                    prefixes.insert(at, prefix);
                }
            }
        }
        best.unwrap() as i32
    }
}
