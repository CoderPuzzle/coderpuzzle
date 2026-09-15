impl Solution {
    pub fn count_squares(matrix: Vec<Vec<i32>>) -> i32 {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut total: i32 = 0;
        // dp rows: side of the largest all-ones square whose bottom-right
        // corner sits at each cell; only the previous row is ever needed
        let mut prev = vec![0i32; n];
        let mut cur = vec![0i32; n];
        for i in 0..m {
            for j in 0..n {
                cur[j] = 0;
                // a 0 cell ends no square; entry stays 0
                if matrix[i][j] == 0 {
                    continue;
                }
                if i == 0 || j == 0 {
                    // no room to extend past the matrix edge
                    cur[j] = 1;
                } else {
                    // limited by the three neighbors: above, left, diagonal
                    cur[j] = prev[j].min(cur[j - 1]).min(prev[j - 1]) + 1;
                }
                // a corner of max side k covers all k nested squares ending
                // there, so summing dp values counts every square exactly once
                total += cur[j];
            }
            std::mem::swap(&mut prev, &mut cur);
        }
        total
    }
}
