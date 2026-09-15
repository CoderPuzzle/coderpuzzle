impl Solution {
    pub fn bulb_switch(n: i32) -> i32 {
        // Round d toggles bulb i exactly when d divides i, so bulb i flips
        // once per divisor and ends on iff that divisor count is odd.
        // Divisors pair d with i / d; only a perfect square leaves its middle
        // divisor d = i / d unpaired, so the bulbs still on are exactly the
        // squares 1, 4, 9, … — Example 1 ends [on, off, off] with bulb 1
        // alone lit. Round the float root to the nearest integer, then the
        // one squaring comparison settles any rounding — floor(sqrt(n))
        // without ever truncating a float that landed low.
        let mut root = (n as f64).sqrt().round() as i32;
        if root * root > n {
            root -= 1;
        }
        root
    }
}
