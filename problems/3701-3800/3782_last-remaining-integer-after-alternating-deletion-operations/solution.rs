impl Solution {
    pub fn last_integer(n: i64) -> i64 {
        let mut start: i64 = 1;
        let mut step: i64 = 1;
        let mut remaining = n;
        let mut from_left = true;
        while remaining > 1 {
            if !from_left && remaining % 2 == 0 {
                start += step;
            }
            remaining = (remaining + 1) / 2;
            step *= 2;
            from_left = !from_left;
        }
        start
    }
}
