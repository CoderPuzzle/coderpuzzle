impl Solution {
    pub fn diagonal_sum(mat: Vec<Vec<i32>>) -> i32 {
        let n = mat.len();
        let mut total = 0;
        for i in 0..n {
            total += mat[i][i];
            let j = n - 1 - i;
            // the two diagonals meet at the center of an odd-sized matrix;
            // only add the mirror cell when it is a different position
            if j != i {
                total += mat[i][j];
            }
        }
        total
    }
}
