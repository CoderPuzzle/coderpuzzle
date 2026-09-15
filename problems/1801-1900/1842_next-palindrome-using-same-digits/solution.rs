impl Solution {
    // A palindrome is fully determined by its first half (the middle digit
    // of an odd-length palindrome is fixed by the multiset). The smallest
    // larger palindrome rearranging the same digits is the next
    // permutation of the first floor(n/2) digits, mirrored.
    pub fn next_palindrome(num: String) -> String {
        let bytes = num.as_bytes();
        let n = bytes.len();
        if n == 1 {
            return String::new();
        }
        let mut half: Vec<u8> = bytes[..n / 2].to_vec();
        // classic next-permutation on the half
        let mut i = half.len() as i64 - 2;
        while i >= 0 && half[i as usize] >= half[i as usize + 1] {
            i -= 1;
        }
        if i < 0 {
            return String::new();
        }
        let i = i as usize;
        let mut j = half.len() - 1;
        while half[j] <= half[i] {
            j -= 1;
        }
        half.swap(i, j);
        half[i + 1..].reverse();
        let h = String::from_utf8(half).unwrap();
        let mirrored: String = h.chars().rev().collect();
        if n % 2 == 0 {
            format!("{}{}", h, mirrored)
        } else {
            format!("{}{}{}", h, num.as_bytes()[n / 2] as char, mirrored)
        }
    }
}
