impl Solution {
    pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
        // Both guarantees together make row-major reading order one sorted
        // sequence, so a single bisection over the flattened index space
        // honors the O(log(m * n)) requirement.
        let m = matrix.len();
        let n = matrix[0].len();
        let mut lo = 0;
        let mut hi = m * n;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if matrix[mid / n][mid % n] < target {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // lo is the first flattened index holding a value >= target: the hit
        // itself when present, or the smallest value past it when absent.
        lo < m * n && matrix[lo / n][lo % n] == target
    }
}
