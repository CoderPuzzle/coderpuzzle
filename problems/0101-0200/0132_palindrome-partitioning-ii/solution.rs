impl Solution {
    pub fn min_cut(s: String) -> i32 {
        let b = s.as_bytes();
        let n = b.len();
        // cut[i] = minimum cuts for the prefix of length i; cut[0] = -1 is a
        // sentinel making a prefix that is itself one palindrome cost 0, and
        // i - 1 is the all-single-characters fallback upper bound.
        let mut cut: Vec<i32> = (-1..n as i32).collect();
        for c in 0..n {
            // Odd-length palindromes expand from (c, c): each still-matching
            // step exposes s[l..r] and relaxes cut[r+1] with cut[l]+1.
            // Left-to-right centers keep every cut[l] read already final.
            let (mut l, mut r) = (c as isize, c as isize);
            while l >= 0 && (r as usize) < n && b[l as usize] == b[r as usize] {
                let relaxed = cut[l as usize] + 1;
                if relaxed < cut[r as usize + 1] {
                    cut[r as usize + 1] = relaxed;
                }
                l -= 1;
                r += 1;
            }
            // Even-length palindromes expand from (c, c + 1).
            let (mut l, mut r) = (c as isize, c as isize + 1);
            while l >= 0 && (r as usize) < n && b[l as usize] == b[r as usize] {
                let relaxed = cut[l as usize] + 1;
                if relaxed < cut[r as usize + 1] {
                    cut[r as usize + 1] = relaxed;
                }
                l -= 1;
                r += 1;
            }
        }
        cut[n]
    }
}
