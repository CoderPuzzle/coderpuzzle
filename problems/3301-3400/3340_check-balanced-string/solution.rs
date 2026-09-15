impl Solution {
    // Only the two digit totals matter, and one pass can carry both at
    // once: add every digit sitting at an even index and subtract every
    // digit at an odd index. The even- and odd-index sums are equal
    // exactly when the signed total ends back at zero, so no second
    // pass or pair of accumulators is needed.
    pub fn is_balanced(num: String) -> bool {
        let mut balance = 0i32;
        for (i, byte) in num.bytes().enumerate() {
            balance += if i % 2 == 0 {
                (byte - b'0') as i32
            } else {
                -((byte - b'0') as i32)
            };
        }
        balance == 0
    }
}
