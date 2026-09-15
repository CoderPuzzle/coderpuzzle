impl Solution {
    // Deletion only lowers counts, so some kept letter ends up with the
    // smallest final frequency x and every other kept letter must land in
    // [x, x + k]: letters above the window donate their excess, letters
    // below it vanish entirely. Trying each letter's original count as x
    // covers the optimum, since the winning x is always a count that some
    // letter keeps for free.
    pub fn minimum_deletions(word: String, k: i32) -> i32 {
        let mut counts = [0i32; 26];
        for byte in word.bytes() {
            counts[(byte - b'a') as usize] += 1;
        }
        let mut best = word.len() as i32;
        for &base in &counts {
            let mut deletions = 0;
            for &cnt in &counts {
                if cnt < base {
                    deletions += cnt;
                } else if cnt > base + k {
                    deletions += cnt - (base + k);
                }
            }
            best = best.min(deletions);
        }
        best
    }
}
