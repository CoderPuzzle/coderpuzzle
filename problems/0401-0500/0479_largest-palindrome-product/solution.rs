impl Solution {
    pub fn largest_palindrome(n: i32) -> i32 {
        // Every 2-digit palindrome is a multiple of 11, which no product of
        // two 1-digit factors can be, so the answer is the palindrome 9 = 3 * 3.
        if n == 1 {
            return 9;
        }
        let mut top: i64 = 1;
        for _ in 0..n {
            top *= 10;
        }
        let (hi, lo) = (top - 1, top / 10);
        // A 2n-digit palindrome is fixed by its first half: enumerate halves
        // downward, so the first candidate that factors is the largest.
        for half in (lo..=hi).rev() {
            // Mirror the half arithmetically: append its digits, least
            // significant first, to build the 2n-digit candidate.
            let (mut palindrome, mut rest) = (half, half);
            while rest > 0 {
                palindrome = palindrome * 10 + rest % 10;
                rest /= 10;
            }
            // f64 sqrt rounds above 2^53, so settle the floor exactly.
            let mut root = (palindrome as f64).sqrt() as i64;
            while root * root > palindrome {
                root -= 1;
            }
            while (root + 1) * (root + 1) <= palindrome {
                root += 1;
            }
            // The larger factor of any pair lies between hi and the integer
            // square root; the cofactor check rejects pairs whose cofactor
            // runs a digit long.
            for factor in (root..=hi).rev() {
                if palindrome % factor == 0 {
                    let other = palindrome / factor;
                    if other >= lo && other <= hi {
                        return (palindrome % 1337) as i32;
                    }
                }
            }
        }
        // Every width from 2 up has a palindromic product; this is only the
        // exit the compiler needs.
        0
    }
}
