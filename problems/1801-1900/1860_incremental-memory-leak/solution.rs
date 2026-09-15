impl Solution {
    // Straight simulation: at most ~93k seconds for 2^31 inputs because the
    // consumed total grows quadratically.
    pub fn mem_leak(memory1: i64, memory2: i64) -> Vec<i64> {
        let (mut a, mut b) = (memory1, memory2);
        let mut t: i64 = 1;
        loop {
            if a >= b {
                if a < t {
                    break;
                }
                a -= t;
            } else {
                if b < t {
                    break;
                }
                b -= t;
            }
            t += 1;
        }
        vec![t, a, b]
    }
}
