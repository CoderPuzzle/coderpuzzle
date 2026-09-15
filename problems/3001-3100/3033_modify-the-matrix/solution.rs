impl Solution {
    pub fn modified_matrix(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Each column holds at least one non-negative value, so the plain
        // column maximum is never the -1 sentinel itself and is exactly
        // what every -1 of that column should become.
        let m = matrix.len();
        let n = matrix[0].len();
        let mut answer = matrix.clone();
        for j in 0..n {
            let mut best = matrix[0][j];
            for i in 1..m {
                best = best.max(matrix[i][j]);
            }
            for i in 0..m {
                if answer[i][j] == -1 {
                    answer[i][j] = best;
                }
            }
        }
        answer
    }
}
