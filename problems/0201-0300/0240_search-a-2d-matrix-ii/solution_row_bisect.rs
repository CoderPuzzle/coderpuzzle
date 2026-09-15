impl Solution {
    pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
        if matrix.is_empty() || matrix[0].is_empty() {
            return false;
        }
        let cols = matrix[0].len();
        for row in &matrix {
            // Columns are sorted, so once a row's first element already
            // exceeds the target, every later row starts even larger — the
            // target cannot exist below, so stop scanning entirely.
            if row[0] > target {
                break;
            }
            // Each row is sorted, so binary-search it in O(log n).
            let mut lo = 0usize;
            let mut hi = cols - 1;
            while lo < hi {
                let mid = (lo + hi) / 2;
                if row[mid] < target {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // lo lands on the leftmost element >= target; equality means
            // the target is present in this row.
            if row[lo] == target {
                return true;
            }
        }
        // m rows each searched in O(log n): O(m log n), versus the
        // staircase's O(m + n).
        false
    }
}
