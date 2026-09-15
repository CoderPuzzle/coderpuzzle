impl Solution {
    pub fn min_deletion_size(strs: Vec<String>) -> i32 {
        let rows = strs.len();
        let cols = strs[0].len();
        let mut deletions = 0;
        // cut[i]: rows i and i + 1 are already strictly ordered on the kept
        // prefix, so later columns no longer constrain that pair. The
        // strings are lowercase ASCII, so byte order is letter order.
        let mut cut = vec![false; rows - 1];
        for j in 0..cols {
            let mut bad = false;
            for i in 0..rows - 1 {
                if !cut[i] && strs[i].as_bytes()[j] > strs[i + 1].as_bytes()[j] {
                    // A still-undecided pair drops here: the column must go.
                    bad = true;
                    break;
                }
            }
            if bad {
                deletions += 1;
                continue;
            }
            for i in 0..rows - 1 {
                if !cut[i] && strs[i].as_bytes()[j] < strs[i + 1].as_bytes()[j] {
                    // A strict rise settles the pair for every later column.
                    cut[i] = true;
                }
            }
        }
        deletions
    }
}
