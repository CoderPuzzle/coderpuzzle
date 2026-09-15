impl Solution {
    pub fn min_flips(target: String) -> i32 {
        // `current` tracks the bit the string holds at the position just
        // processed, starting from the initial all-zero string. Each
        // mismatch means the suffix from here on needs one more flip, and
        // flips the tracked bit to match.
        let mut current = b'0';
        let mut count = 0;
        for c in target.bytes() {
            if c != current {
                count += 1;
                current = c;
            }
        }
        count
    }
}
