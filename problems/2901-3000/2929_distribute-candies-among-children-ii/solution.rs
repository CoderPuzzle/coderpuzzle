impl Solution {
    pub fn distribute_candies(n: i32, limit: i32) -> i64 {
        // Inclusion-exclusion over the three per-child caps: without caps
        // the splits of n among 3 children number C(n + 2, 2); forcing a
        // child over its cap is counted by C(n - (limit+1) + 2, 2), and
        // the alternating sum repairs double- and triple-forced overlaps.
        // Terms reach 1.5 * 10^12, so i64 carries them.
        fn capped_ways(candies: i64) -> i64 {
            if candies >= 2 {
                candies * (candies - 1) / 2
            } else {
                0
            }
        }
        let wide = |value: i32| i64::from(value);
        capped_ways(wide(n) + 2) - 3 * capped_ways(wide(n) - wide(limit) - 1 + 2)
            + 3 * capped_ways(wide(n) - 2 * (wide(limit) + 1) + 2)
            - capped_ways(wide(n) - 3 * (wide(limit) + 1) + 2)
    }
}
