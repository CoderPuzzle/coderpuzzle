impl Solution {
    pub fn shortest_beautiful_substring(s: String, k: i32) -> String {
        // For a fixed left end i, extending right until the window first
        // holds exactly k ones yields the only shortest beautiful candidate
        // that starts at i: any earlier cut has fewer ones, and any later
        // cut with k ones is strictly longer.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut best: &str = "";
        for i in 0..n {
            let mut ones = 0;
            for j in i..n {
                if bytes[j] == b'1' {
                    ones += 1;
                }
                if ones == k as usize {
                    let candidate = &s[i..j + 1];
                    if best.is_empty() || candidate.len() < best.len() {
                        best = candidate;
                    } else if candidate.len() == best.len() && candidate < best {
                        best = candidate;
                    }
                    break;
                }
            }
        }
        best.to_string()
    }
}
