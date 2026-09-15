impl Solution {
    pub fn lucky_numbers(matrix: Vec<Vec<i32>>) -> Vec<i32> {
        let row_min: Vec<i32> = matrix.iter().map(|row| *row.iter().min().unwrap()).collect();
        let n = matrix[0].len();
        let mut col_max = vec![i32::MIN; n];
        for row in &matrix {
            for (c, &v) in row.iter().enumerate() {
                col_max[c] = col_max[c].max(v);
            }
        }
        let mut lucky: Vec<i32> = matrix
            .iter()
            .enumerate()
            .flat_map(|(r, row)| {
                row.iter()
                    .enumerate()
                    .filter(|&(c, &v)| v == row_min[r] && v == col_max[c])
                    .map(|(_c, &v)| v)
                    .collect::<Vec<i32>>()
            })
            .collect();
        lucky.sort_unstable();
        lucky
    }
}
