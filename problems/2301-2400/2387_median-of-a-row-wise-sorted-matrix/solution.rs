impl Solution {
    pub fn matrix_median(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        // Odd element count, so the median is the m*n/2+1-th smallest value
        // — an actual matrix entry, returned exactly.
        let need = (m * n) / 2 + 1;
        // Binary-search the value itself between the smallest row head and
        // the largest row tail.
        let mut lo = i32::MAX;
        let mut hi = i32::MIN;
        for row in &grid {
            lo = lo.min(row[0]);
            hi = hi.max(row[n - 1]);
        }
        let count_le = |x: i32| -> usize {
            // Each row is sorted, so partition_point counts its <=x entries
            // in O(log n); row counts add up across the matrix.
            grid.iter().map(|row| row.partition_point(|&v| v <= x)).sum()
        };
        // Find the smallest x with count_le(x) >= need. It must occur in
        // the matrix, else the counts at x and x-1 would be equal.
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if count_le(mid) >= need {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
