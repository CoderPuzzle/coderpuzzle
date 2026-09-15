impl Solution {
    pub fn smallest_palindrome(s: String) -> String {
        // A palindrome is (half) + (odd char, at most one) + reverse(half),
        // and the half's multiset is forced: exactly count[c] // 2 of each
        // letter. So the smallest palindrome is the sorted half, mirrored.
        let mut counts = [0usize; 26];
        for ch in s.bytes() {
            counts[(ch - b'a') as usize] += 1;
        }
        let mut half = Vec::with_capacity(s.len() / 2);
        let mut middle = 0u8;
        for i in 0..26 {
            for _ in 0..counts[i] / 2 {
                half.push(b'a' + i as u8);
            }
            if counts[i] % 2 == 1 {
                middle = b'a' + i as u8;
            }
        }
        let mut tail = half.clone();
        tail.reverse();
        let mut out = String::from_utf8(half).unwrap();
        if middle != 0 {
            out.push(middle as char);
        }
        out.push_str(&String::from_utf8(tail).unwrap());
        out
    }
}
