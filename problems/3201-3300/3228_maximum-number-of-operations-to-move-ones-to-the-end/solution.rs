impl Solution {
    pub fn max_operations(s: String) -> i32 {
        // Each operation sends one '1' across one whole block of 0's,
        // stopping at the next '1' or the end. A pair — a '1' with a block
        // of 0's opening strictly to its right — is spent at most once,
        // because 0's never move and a landed '1' stays past them forever;
        // always taking the lowest legal index spends every such pair
        // exactly once. The answer is therefore just the number of these
        // pairs: sweeping left to right, whenever a fresh block of 0's
        // opens, every '1' seen so far sits to its left and contributes
        // exactly one operation.
        let bytes = s.as_bytes();
        let mut operations: i32 = 0;
        let mut ones: i32 = 0;
        for i in 0..bytes.len() {
            if bytes[i] == b'1' {
                ones += 1;
            } else if i == 0 || bytes[i - 1] == b'1' {
                operations += ones;
            }
        }
        operations
    }
}
