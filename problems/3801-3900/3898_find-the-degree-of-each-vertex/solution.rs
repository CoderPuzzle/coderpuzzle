impl Solution {
    pub fn find_degrees(matrix: Vec<Vec<i32>>) -> Vec<i32> {
        matrix.into_iter().map(|row| row.into_iter().sum()).collect()
    }
}
