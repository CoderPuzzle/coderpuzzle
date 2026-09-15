impl Solution {
    pub fn multiply(mat1: Vec<Vec<i32>>, mat2: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = mat1.len();
        let k = mat2.len();
        let n = mat2[0].len();
        // For each row of mat2, the (column, value) pairs that are nonzero —
        // the only entries a nonzero mat1 cell can ever pair with.
        let nonzero2: Vec<Vec<(usize, i32)>> = mat2
            .iter()
            .map(|row| {
                row.iter()
                    .enumerate()
                    .filter(|&(_, &value)| value != 0)
                    .map(|(j, &value)| (j, value))
                    .collect()
            })
            .collect();
        let mut result = vec![vec![0; n]; m];
        // A zero in mat1 wipes a whole row of products; skip it instead of
        // multiplying every mat2 entry by zero.
        for (i, row) in mat1.iter().enumerate() {
            for (p, &value) in row.iter().enumerate() {
                if value == 0 {
                    continue;
                }
                for &(j, other) in &nonzero2[p] {
                    result[i][j] += value * other;
                }
            }
        }
        result
    }
}
