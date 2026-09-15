impl Solution {
    pub fn shifting_letters(s: String, shifts: Vec<i32>) -> String {
        // Letter i is advanced once by every shifts[j] with j >= i, so its
        // total shift is the suffix sum shifts[i..n-1] — one running total
        // on a right-to-left scan replaces all the prefix operations.
        // 10^5 shifts of 10^9 sum to 10^14, far past i32, so the total is i64.
        let mut bytes = s.into_bytes();
        let mut total: i64 = 0;
        for i in (0..bytes.len()).rev() {
            total += shifts[i] as i64;
            // Shifts are non-negative, so % 26 lands the wrap z -> a exactly.
            let shifted = (bytes[i] - b'a') as i64 + total % 26;
            bytes[i] = b'a' + (shifted % 26) as u8;
        }
        // every byte is a lowercase letter by construction, so this never fails
        String::from_utf8(bytes).unwrap()
    }
}
