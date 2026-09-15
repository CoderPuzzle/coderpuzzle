impl Solution {
    pub fn get_row(row_index: i32) -> Vec<i32> {
        let n = row_index as usize;
        // One vector of edge 1s, folded forward row by row: after pass i its
        // first i + 1 cells hold row i exactly, so the returned vector is the
        // only one ever allocated — the O(rowIndex) space the follow-up asks for.
        let mut row = vec![1; n + 1];
        for length in 2..=n {
            // Right-to-left: row[j - 1] still holds the previous row's value
            // when row[j] is updated, so row[j] += row[j - 1] is exactly the
            // sum-of-the-two-cells-directly-above recurrence.
            for j in (1..length).rev() {
                row[j] += row[j - 1];
            }
        }
        row
    }
}
