impl Solution {
    pub fn first_matching_index(s: String) -> i32 {
        // The smallest matching index can never sit past the middle: once i
        // exceeds n-1-i the pair is a repeat of one already tested. Scan the
        // outward-in pairs from index 0 and return the first equal one.
        let bytes = s.as_bytes();
        let n = bytes.len();
        for i in 0..(n + 1) / 2 {
            if bytes[i] == bytes[n - 1 - i] {
                return i as i32;
            }
        }
        -1
    }
}
