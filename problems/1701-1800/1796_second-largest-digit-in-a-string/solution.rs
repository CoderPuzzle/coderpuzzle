impl Solution {
    pub fn second_highest(s: String) -> i32 {
        // One pass tracking the two largest distinct digits seen: first
        // is the maximum, second the runner-up. A digit equal to an
        // already-tracked value changes nothing, which is the
        // distinctness rule; -1 survives when fewer than two distinct
        // digits appear.
        let mut first = -1;
        let mut second = -1;
        for c in s.bytes() {
            if c.is_ascii_digit() {
                let v = (c - b'0') as i32;
                if v > first {
                    second = first;
                    first = v;
                } else if second < v && v < first {
                    second = v;
                }
            }
        }
        second
    }
}
