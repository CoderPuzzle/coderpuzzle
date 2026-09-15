impl Solution {
    pub fn min_deletion_size(strs: Vec<String>) -> i32 {
        let rows = strs.len();
        let cols = strs[0].len();
        // dp[j] = the most columns a valid surviving chain can hold when it
        // ends at column j; a later column extends it only when no row
        // descends between the two columns. The strings are lowercase
        // ASCII, so byte order is letter order.
        let mut dp = vec![1usize; cols];
        let mut best = 1usize;
        for j in 0..cols {
            for i in 0..j {
                let mut ok = true;
                for r in 0..rows {
                    if strs[r].as_bytes()[i] > strs[r].as_bytes()[j] {
                        ok = false;
                        break;
                    }
                }
                if ok && dp[i] + 1 > dp[j] {
                    dp[j] = dp[i] + 1;
                }
            }
            if dp[j] > best {
                best = dp[j];
            }
        }
        (cols - best) as i32
    }
}
