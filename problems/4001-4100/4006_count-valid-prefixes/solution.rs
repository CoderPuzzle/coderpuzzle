impl Solution {
    pub fn count_valid_prefixes(s: String) -> i32 {
        // A prefix rearranges into an alternating string exactly when its counts
        // of '0' and '1' differ by at most one, so track both running counts
        // through one pass and count the prefixes whose balance stays within one.
        let (mut zeros, mut ones, mut valid): (i32, i32, i32) = (0, 0, 0);
        for ch in s.chars() {
            if ch == '0' {
                zeros += 1;
            } else {
                ones += 1;
            }
            if (zeros - ones).abs() <= 1 {
                valid += 1;
            }
        }
        valid
    }
}
