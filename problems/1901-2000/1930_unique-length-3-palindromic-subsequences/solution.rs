impl Solution {
    pub fn count_palindromic_subsequence(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut count = 0;
        for c in b'a'..=b'z' {
            // Palindrome c-y-c exists iff some y sits strictly between the
            // first and last occurrence of c: anchoring the outers at the
            // outermost occurrences is the most permissive choice.
            let first = bytes.iter().position(|&b| b == c);
            if let Some(first) = first {
                let last = bytes.iter().rposition(|&b| b == c).unwrap();
                if last - first >= 2 {
                    // Distinct chars only (a bitmap, not positions) so each
                    // palindrome is counted once despite repeated middles.
                    let mut seen = [false; 26];
                    for i in first + 1..last {
                        seen[(bytes[i] - b'a') as usize] = true;
                    }
                    count += seen.iter().filter(|&&b| b).count() as i32;
                }
            }
        }
        count
    }
}
