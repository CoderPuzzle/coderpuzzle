impl Solution {
    pub fn query_string(s: String, n: i32) -> bool {
        // 10^9 fits in 30 bits, so every i in [1, n] has a short binary
        // form; checking each one as a substring of s directly answers
        // the question.
        for i in 1..=n {
            let bin = format!("{:b}", i);
            if !s.contains(&bin) {
                return false;
            }
        }
        true
    }
}
