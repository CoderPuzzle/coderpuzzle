impl Solution {
    pub fn min_deletion_size(strs: Vec<String>) -> i32 {
        let rows = strs.len();
        let cols = strs[0].len();
        let mut deletions = 0;
        for j in 0..cols {
            for i in 1..rows {
                // A column is condemned the moment a character drops below
                // the one above it; equal characters never condemn. The
                // strings are lowercase ASCII, so byte order is letter order.
                if strs[i].as_bytes()[j] < strs[i - 1].as_bytes()[j] {
                    deletions += 1;
                    break;
                }
            }
        }
        deletions
    }
}
