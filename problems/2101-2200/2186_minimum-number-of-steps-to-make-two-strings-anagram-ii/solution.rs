impl Solution {
    pub fn min_steps(s: String, t: String) -> i32 {
        // Order is irrelevant; only letter counts matter. Every unmatched
        // copy of a letter on either side costs one append on the other.
        let mut counts = [0i64; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        for b in t.bytes() {
            counts[(b - b'a') as usize] -= 1;
        }
        counts.iter().map(|d| d.abs()).sum::<i64>() as i32
    }
}
