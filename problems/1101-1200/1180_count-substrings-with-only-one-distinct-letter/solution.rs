impl Solution {
    pub fn count_letters(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut total = 0i64;
        let mut run = 0i64;
        let mut prev: u8 = 0;
        for &ch in bytes {
            // Extend the current uniform run, or start a new one; adding
            // the run length each step sums L(L+1)/2 per maximal run.
            if ch == prev {
                run += 1;
            } else {
                run = 1;
                prev = ch;
            }
            total += run;
        }
        total as i32
    }
}
