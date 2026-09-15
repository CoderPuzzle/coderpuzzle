impl Solution {
    pub fn remove_almost_equal_characters(word: String) -> i32 {
        // Scan left to right. Each almost-equal neighbor pair needs one
        // change; by rewriting word[i] to a letter almost-equal to neither
        // neighbor (always available: each neighbor forbids at most 3 of
        // 26 letters) one change settles both the pair behind and the pair
        // ahead of i, so the scan skips two positions after a change.
        let bytes = word.as_bytes();
        let mut ops = 0i32;
        let mut i = 1;
        while i < bytes.len() {
            if bytes[i].abs_diff(bytes[i - 1]) <= 1 {
                ops += 1;
                i += 2;
            } else {
                i += 1;
            }
        }
        ops
    }
}
