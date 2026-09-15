impl Solution {
    pub fn almost_palindromic(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();

        // These arrays describe intervals of the two preceding lengths.
        // Empty and one-character intervals are palindromes. A one-character
        // interval is also almost-palindromic because deleting it leaves the
        // empty palindrome.
        let mut pal_two = vec![1u8; n + 1];
        let mut almost_two = vec![0u8; n + 1];
        let mut pal_one = vec![1u8; n];
        let mut almost_one = vec![1u8; n];
        let mut best = 1;

        for length in 2..=n {
            let count = n - length + 1;
            let mut pal_now = vec![0u8; count];
            let mut almost_now = vec![0u8; count];
            for left in 0..count {
                let right = left + length - 1;
                let same_ends = bytes[left] == bytes[right];
                pal_now[left] = (same_ends && pal_two[left + 1] != 0) as u8;

                // Delete the right end, delete the left end, or keep both
                // matching ends and use the deletion inside.
                almost_now[left] =
                    (pal_one[left] != 0 || pal_one[left + 1] != 0 || (same_ends && almost_two[left + 1] != 0)) as u8;
                if almost_now[left] != 0 {
                    best = length as i32;
                }
            }

            pal_two = pal_one;
            pal_one = pal_now;
            almost_two = almost_one;
            almost_one = almost_now;
        }

        best
    }
}
