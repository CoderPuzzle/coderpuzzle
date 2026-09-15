impl Solution {
    pub fn max_side_length(mat: Vec<Vec<i32>>, threshold: i32) -> i32 {
        let m = mat.len();
        let n = mat[0].len();
        // prefix[i][j] = sum of the rectangle from (0,0) to (i-1, j-1)
        let mut prefix = vec![vec![0i64; n + 1]; m + 1];
        for i in 0..m {
            for j in 0..n {
                prefix[i + 1][j + 1] = prefix[i + 1][j] + prefix[i][j + 1] - prefix[i][j] + mat[i][j] as i64;
            }
        }

        // inclusion-exclusion of four corners: any square sum in O(1)
        let square_sum = |i: usize, j: usize, k: usize| -> i64 {
            let p = &prefix;
            p[i + k][j + k] - p[i][j + k] - p[i + k][j] + p[i][j]
        };

        // one global answer; each top-left corner only tries to extend it
        let mut ans: usize = 0;
        for i in 0..m {
            for j in 0..n {
                // try side ans+1 while it fits the matrix and the threshold;
                // ans never shrinks, so failures cost a single O(1) check and
                // each side length is paid at most once across the scan
                while i + ans < m && j + ans < n && square_sum(i, j, ans + 1) <= threshold as i64 {
                    ans += 1;
                }
            }
        }
        ans as i32
    }
}
