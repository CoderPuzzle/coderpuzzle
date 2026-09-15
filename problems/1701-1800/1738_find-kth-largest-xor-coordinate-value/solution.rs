// A coordinate value is the XOR of the upper-left submatrix ending there,
// and XOR cancels itself: prefix[a][b] = matrix[a][b] ^ prefix[a-1][b]
// ^ prefix[a][b-1] ^ prefix[a-1][b-1]. Sweeping row by row, the running XOR
// of the current row folded with the previous prefix row yields the new row
// in O(n) space; collect all m * n values, sort, and the kth largest sits k
// from the end.
impl Solution {
    pub fn kth_largest_value(matrix: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = matrix[0].len();
        let mut above = vec![0; n];
        let mut values: Vec<i32> = Vec::with_capacity(matrix.len() * n);
        for row in &matrix {
            let mut left = 0;
            let mut current = vec![0; n];
            for (j, &value) in row.iter().enumerate() {
                left ^= value;
                current[j] = left ^ above[j];
                values.push(current[j]);
            }
            above = current;
        }
        values.sort_unstable();
        values[values.len() - k as usize]
    }
}
