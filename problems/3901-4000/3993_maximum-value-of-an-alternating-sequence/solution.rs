impl Solution {
    pub fn maximum_value(n: i32, s: i32, m: i32) -> i64 {
        if n == 1 {
            return s as i64;
        }
        let high_count = n as i64 / 2;
        let increase_first = s as i64 + m as i64 + (high_count - 1) * (m as i64 - 1);
        let decrease_first = s as i64 + m as i64 - 1 + (high_count - 1) * (m as i64 - 1);
        increase_first.max(decrease_first)
    }
}
