impl Solution {
    pub fn longest_line(mat: Vec<Vec<i32>>) -> i32 {
        // Scan row by row; prev[j] holds the four run lengths that end at
        // cell (i - 1, j): horizontal, vertical, diagonal, anti-diagonal.
        let m = mat.len();
        let n = mat[0].len();
        let mut prev = vec![[0i32; 4]; n];
        let mut best = 0i32;
        for i in 0..m {
            let mut cur = vec![[0i32; 4]; n];
            for j in 0..n {
                if mat[i][j] == 1 {
                    // Horizontal: extend the run arriving from the left.
                    cur[j][0] = 1 + if j > 0 { cur[j - 1][0] } else { 0 };
                    // Vertical: extend the run arriving from above.
                    cur[j][1] = 1 + prev[j][1];
                    // Diagonal: extend the run arriving from up-left.
                    cur[j][2] = 1 + if j > 0 { prev[j - 1][2] } else { 0 };
                    // Anti-diagonal: extend the run arriving from up-right.
                    cur[j][3] = 1 + if j + 1 < n { prev[j + 1][3] } else { 0 };
                    best = best.max(cur[j][0]).max(cur[j][1]).max(cur[j][2]).max(cur[j][3]);
                }
            }
            prev = cur;
        }
        best
    }
}
