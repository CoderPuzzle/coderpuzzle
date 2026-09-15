impl Solution {
    pub fn min_flips_mono_incr(s: String) -> i32 {
        // A monotone increasing string is a block of 0's then a block of 1's, so
        // a flip plan only chooses where the boundary sits. The sweep keeps
        // ones, the 1's seen so far, and flips, the cheapest repair of the
        // prefix read so far: a '1' may always stay — appending 1 to a monotone
        // prefix leaves it monotone — while a '0' is either flipped at cost
        // flips + 1 or kept, which is legal only once every earlier 1 has been
        // flipped, at cost ones — so flips = min(flips + 1, ones).
        let s = s.as_bytes();
        let mut ones = 0i32;
        let mut flips = 0i32;
        for &b in s {
            if b == b'0' {
                flips = (flips + 1).min(ones);
            } else {
                ones += 1;
            }
        }
        flips
    }
}
