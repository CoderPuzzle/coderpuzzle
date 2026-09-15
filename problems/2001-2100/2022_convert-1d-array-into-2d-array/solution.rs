impl Solution {
    pub fn construct_2d_array(original: Vec<i32>, m: i32, n: i32) -> Vec<Vec<i32>> {
        if m as i64 * n as i64 != original.len() as i64 {
            return Vec::new();
        }

        let rows = m as usize;
        let columns = n as usize;
        let mut result = vec![vec![0; columns]; rows];
        for row in 0..rows {
            for column in 0..columns {
                result[row][column] = original[row * columns + column];
            }
        }
        result
    }
}
