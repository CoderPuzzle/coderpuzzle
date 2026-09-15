impl Solution {
    pub fn count_binary_palindromes(n: i64) -> i32 {
        // Zero's representation "0" is a palindrome by definition.
        if n == 0 {
            return 1;
        }
        let mut length = 0usize;
        let mut t = n;
        while t != 0 {
            t >>= 1;
            length += 1;
        }
        // A binary palindrome is fixed by its first ceil(l / 2) bits (the
        // root): the rest mirrors them, sharing the middle bit when l is odd.
        // Every root starts with a 1, so length l carries exactly
        // 2^floor((l - 1) / 2) palindromes, all of them below n. i64 keeps n
        // (up to 10^15) positive and in range.
        let mut count: i64 = 1; // zero itself
        for l in 1..length {
            count += 1i64 << ((l - 1) / 2);
        }
        // Palindromes of n's own length ascend with their root, so every
        // root below n's root also lands entirely under n.
        let h = (length + 1) / 2;
        let root = n >> (length - h);
        count += root - (1i64 << (h - 1));
        // The only candidate left is the palindrome built from n's own root;
        // count it when it does not overshoot n.
        let half = length / 2;
        let mut rev: i64 = 0;
        let mut x = root >> (length % 2);
        for _ in 0..half {
            rev = (rev << 1) | (x & 1);
            x >>= 1;
        }
        if ((root << half) | rev) <= n {
            count += 1;
        }
        count as i32
    }
}
