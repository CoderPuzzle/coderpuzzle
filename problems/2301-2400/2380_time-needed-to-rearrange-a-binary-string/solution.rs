impl Solution {
    // A 1 crosses the run of zeros before it in exactly `zeros`
    // seconds, but cannot start until the previous 1 finished, so
    // each one raises the clock to max(ans + 1, zeros).
    pub fn seconds_to_remove_occurrences(s: String) -> i32 {
        let mut ans = 0i32;
        let mut zeros = 0i32;
        for c in s.chars() {
            if c == '0' {
                zeros += 1;
            } else if zeros > 0 {
                ans = (ans + 1).max(zeros);
            }
        }
        ans
    }
}
