impl Solution {
    pub fn is_reachable(targetX: i32, targetY: i32) -> bool {
        // Reachability invariant: subtractive moves preserve gcd(x, y)
        // exactly and doubling moves scale it by a factor of 2, so along
        // any path from (1, 1) the ODD part of the gcd never changes --
        // and it starts at 1. Hence a reachable point's gcd must be a
        // power of two. The converse is constructive in reverse (Euclid
        // with halvings), so the test is gcd == 2^k via g & (g - 1) == 0.
        // Coordinates are <= 10^9, so every intermediate fits an i32.
        let mut x = targetX;
        let mut y = targetY;
        while y != 0 {
            let t = x % y;
            x = y;
            y = t;
        }
        x & (x - 1) == 0
    }
}
