impl Solution {
    pub fn maximize_the_profit(n: i32, offers: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // Non-overlapping offers make this weighted interval scheduling on a
        // line. Bucket offers by end house — the bucket array itself
        // provides ordering by end position, so no sorting is needed.
        let mut by_end: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for offer in &offers {
            let start = offer[0] as usize;
            let end = offer[1] as usize;
            let gold = offer[2] as i64;
            by_end[end].push((start, gold));
        }
        // dp[e + 1]: best gold from houses 0..e. Either house e stays unsold
        // (carry dp[e] forward) or some offer [start, e, gold] is sold on
        // top of the optimum strictly before its start — reading dp[start]
        // is what keeps overlapping offers from being combined.
        let mut dp = vec![0i64; n + 1];
        for end in 0..n {
            dp[end + 1] = dp[end];
            for &(start, gold) in &by_end[end] {
                let cand = dp[start] + gold;
                if cand > dp[end + 1] {
                    dp[end + 1] = cand;
                }
            }
        }
        dp[n] as i32
    }
}
