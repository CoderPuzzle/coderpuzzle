impl Solution {
    pub fn min_height_shelves(books: Vec<Vec<i32>>, shelf_width: i32) -> i32 {
        // Order is fixed and each shelf holds a contiguous run, so the only
        // freedom is where boundaries fall: dp[i] = best height for the first
        // i books, with dp[0] = 0 as the empty base.
        let count = books.len();
        let mut dp = vec![0i64; count + 1];
        for i in 1..=count {
            // Grow the last shelf of the prefix backwards from book i-1,
            // accumulating width and the run's max height.
            let mut width = 0i64;
            let mut height = 0i64;
            dp[i] = i64::MAX / 2;
            let mut j = i as isize - 1;
            while j >= 0 {
                let j_us = j as usize;
                width += books[j_us][0] as i64;
                // Earlier books only widen the run further: stop here.
                if width > shelf_width as i64 {
                    break;
                }
                height = height.max(books[j_us][1] as i64);
                // Books j..i-1 form the last shelf at cost dp[j] + height.
                dp[i] = dp[i].min(dp[j_us] + height);
                j -= 1;
            }
        }
        dp[count] as i32
    }
}
