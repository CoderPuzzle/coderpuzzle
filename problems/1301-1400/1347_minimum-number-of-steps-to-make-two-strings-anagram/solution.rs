impl Solution {
    pub fn min_steps(s: String, t: String) -> i32 {
        // The answer is the per-letter deficit of t relative to s; each
        // replacement clears one unit, and deficits equal surpluses.
        let mut counts = [0i32; 26];
        for &ch in s.as_bytes() {
            counts[(ch - b'a') as usize] += 1;
        }
        for &ch in t.as_bytes() {
            counts[(ch - b'a') as usize] -= 1;
        }
        counts.iter().filter(|delta| **delta < 0).map(|delta| -delta).sum()
    }
}
