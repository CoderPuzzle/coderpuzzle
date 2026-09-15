impl Solution {
    // A character is non-repeating exactly when it occurs once in the whole
    // string — a global fact no prefix can settle — so the first pass
    // tallies occurrences, one slot per letter of the alphabet.
    pub fn first_uniq_char(s: String) -> i32 {
        let mut counts = [0i32; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        // The second pass scans in index order for the first slot reading
        // exactly 1 — scanning left to right is what answers "first" — and
        // reaching the end without a hit means -1.
        for (i, b) in s.bytes().enumerate() {
            if counts[(b - b'a') as usize] == 1 {
                return i as i32;
            }
        }
        -1
    }
}
