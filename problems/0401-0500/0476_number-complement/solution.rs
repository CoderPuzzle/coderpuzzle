impl Solution {
    // The mask climbs to 2^31 - 1 at the top of the range — the exact
    // ceiling of a signed 32-bit int — so it is built in i64 to keep the
    // doubling away from that boundary.
    pub fn find_complement(num: i32) -> i32 {
        // Doubling a run of ones and adding one extends it by one bit —
        // 1 -> 11 -> 111 — so mask is always 2^k - 1 covering num's window.
        let mut mask: i64 = 1;
        while mask < num as i64 {
            mask = mask * 2 + 1;
        }
        // XOR with the all-ones window flips every bit num occupies and
        // nothing above it.
        (mask ^ num as i64) as i32
    }
}
