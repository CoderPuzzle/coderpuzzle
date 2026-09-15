impl Solution {
    pub fn number_of_unique_good_subsequences(binary: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // end0/end1 = distinct good subsequence VALUES ending in '0'/'1'
        // over the prefix. The lone "0" is the only good value with a
        // leading zero, so it lives in a flag and end0 holds only values
        // starting with '1'.
        let mut end0: i64 = 0;
        let mut end1: i64 = 0;
        let mut has_zero = false;
        for ch in binary.bytes() {
            // Extending every existing value by ch absorbs the old
            // ending-in-ch set (each was itself an extension of something
            // shorter), so the new count is simply end0 + end1.
            if ch == b'0' {
                // No lone "0" and never extend "0" itself: both would be
                // leading-zero values. Appending '0' to a 1-initial value
                // is always safe.
                end0 = (end0 + end1) % MOD;
                has_zero = true;
            } else {
                end1 = (end1 + end0 + 1) % MOD; // +1: the character alone
            }
        }
        // Add back the lone "0" if any zero appeared.
        ((end0 + end1 + if has_zero { 1 } else { 0 }) % MOD) as i32
    }
}
