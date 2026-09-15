impl Solution {
    pub fn multiply(num1: String, num2: String) -> String {
        // The product of an m-digit and an n-digit number has at most m + n
        // digits, so accumulate raw digit-pair products into exactly that many
        // cells before carrying anything.
        let (a, b) = (num1.as_bytes(), num2.as_bytes());
        let mut digits = vec![0i32; a.len() + b.len()];
        for i in (0..a.len()).rev() {
            let d1 = (a[i] - b'0') as i32;
            for j in (0..b.len()).rev() {
                // Digit i of num1 times digit j of num2 lands at i + j + 1
                // (most-significant-first indexing), so every pair can add
                // into its cell directly; no carrying yet.
                digits[i + j + 1] += d1 * (b[j] - b'0') as i32;
            }
        }
        // One right-to-left pass normalizes each cell to a single digit and
        // pushes the overflow one cell left, exactly like schoolbook carrying.
        let mut carry = 0i32;
        for k in (0..digits.len()).rev() {
            let total = digits[k] + carry;
            digits[k] = total % 10;
            carry = total / 10;
        }
        // Neither input has a leading zero, so the product has m + n or
        // m + n - 1 digits; strip the unused leading cell, keeping at least
        // one digit so "0" operands yield "0" with no special case.
        let mut start = 0;
        while start + 1 < digits.len() && digits[start] == 0 {
            start += 1;
        }
        digits[start..].iter().map(|d| (b'0' + *d as u8) as char).collect()
    }
}
