impl Solution {
    // Swaps reach every permutation of s, so the answer is the
    // lexicographically smallest anti-palindrome rearrangement. Sorting
    // already gives the smallest possible left half, and the left half of
    // a sorted string never mirrors onto itself, so only the right half
    // needs repair: whenever a position matches its mirror, swap in the
    // next larger letter, tracked by a pointer that only moves right. The
    // pointer running off the end means some letter fills more than half
    // the string — no arrangement can separate it.
    pub fn make_anti_palindrome(s: String) -> String {
        let mut chars: Vec<u8> = s.bytes().collect();
        chars.sort_unstable();
        let n = chars.len();
        let mut p = n / 2;
        for i in n / 2..n {
            if chars[i] == chars[n - 1 - i] {
                while p < n && chars[p] == chars[i] {
                    p += 1;
                }
                if p == n {
                    return "-1".to_string();
                }
                chars.swap(i, p);
                p += 1;
            }
        }
        String::from_utf8(chars).unwrap()
    }
}
