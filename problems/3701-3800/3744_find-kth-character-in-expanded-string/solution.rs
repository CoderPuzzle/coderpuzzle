impl Solution {
    pub fn kth_character(s: String, k: i64) -> String {
        // A word's letter at offset i (0-based) fills i + 1 consecutive slots
        // of t and a space fills exactly one, so walking s while subtracting
        // each character's cost from k lands on the owner without ever
        // materializing t -- at the constraints t can span billions of
        // characters, so building it is hopeless while this scan is linear.
        // The subtraction needs 64 bits: t's largest length is about 5 * 10^9.
        let mut k = k;
        let mut position: i64 = 0; // 0-based offset of the next char in its word
        for ch in s.chars() {
            if ch == ' ' {
                position = 0;
                k -= 1;
            } else {
                position += 1;
                k -= position;
            }
            if k < 0 {
                return ch.to_string();
            }
        }
        // Unreachable: k always names a valid slot of t.
        unreachable!("k names a valid slot of t")
    }
}
