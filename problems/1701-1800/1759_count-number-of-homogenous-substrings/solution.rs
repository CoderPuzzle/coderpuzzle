impl Solution {
    pub fn count_homogenous(s: String) -> i32 {
        // Each position is charged with the number of homogenous
        // substrings ending there — the current run length — so the
        // running total realizes the per-run triangle sums directly.
        const MOD: i64 = 1_000_000_007;
        let mut total: i64 = 0;
        let mut run: i64 = 0;
        let mut prev: u8 = 0;
        let mut first = true;
        for &c in s.as_bytes() {
            if !first && c == prev {
                run += 1;
            } else {
                run = 1;
            }
            first = false;
            prev = c;
            total = (total + run) % MOD;
        }
        total as i32
    }
}
