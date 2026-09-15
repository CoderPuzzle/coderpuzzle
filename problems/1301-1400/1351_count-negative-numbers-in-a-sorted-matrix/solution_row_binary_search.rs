impl Solution {
    pub fn count_negatives(grid: Vec<Vec<i32>>) -> i32 {
        // Every row is non-increasing, so its negatives are a suffix and the
        // first negative index is one bisection away in O(log n).
        let n = grid[0].len();
        let mut count = 0;
        for row in &grid {
            let mut lo = 0;
            let mut hi = n;
            while lo < hi {
                let mid = (lo + hi) / 2;
                if row[mid] < 0 {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            count += n - lo;
        }
        count as i32
    }
}
