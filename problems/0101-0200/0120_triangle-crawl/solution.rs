impl Solution {
    pub fn minimum_total(triangle: Vec<Vec<i32>>) -> i32 {
        // Work upward from the bottom: row[j] is the cheapest path sum from
        // column j of the row being folded down to the bottom, so a single
        // array of n entries is all the state the scan ever needs.
        let mut row = triangle.last().unwrap().clone();
        for i in (0..triangle.len() - 1).rev() {
            for j in 0..=i {
                // From (i, j) the two allowed steps land on (i + 1, j) and
                // (i + 1, j + 1); both sums are final before the overwrite
                // retires row[j].
                row[j] = triangle[i][j] + row[j].min(row[j + 1]);
            }
        }
        row[0]
    }
}
