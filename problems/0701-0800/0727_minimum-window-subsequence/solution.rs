impl Solution {
    // nxt[i][c] answers "where is the first character c at or after i?" in
    // one lookup: a backward sweep copies each row from its successor and
    // overwrites the column of the character sitting at i; row n is all
    // sentinels, so every failed jump lands on n and ends the walk.
    pub fn min_window(s1: String, s2: String) -> String {
        let (s1, s2) = (s1.as_bytes(), s2.as_bytes());
        let (n, m) = (s1.len(), s2.len());
        let mut nxt = vec![[n; 26]; n + 1];
        for i in (0..n).rev() {
            nxt[i] = nxt[i + 1];
            nxt[i][(s1[i] - b'a') as usize] = i;
        }
        // A minimum window must open on s2[0] — otherwise its head could be
        // cut for a strictly shorter valid window — so walking from every such
        // opening and always jumping to the earliest continuation visits every
        // candidate. Scanning openings left to right and keeping only strictly
        // shorter windows leaves the leftmost one among equal-length winners.
        let (mut best_len, mut best_start) = (n + 1, usize::MAX);
        for i in 0..n {
            if s1[i] != s2[0] {
                continue;
            }
            let mut pos = i;
            let mut ok = true;
            for k in 1..m {
                pos = nxt[pos + 1][(s2[k] - b'a') as usize];
                if pos == n {
                    ok = false;
                    break;
                }
            }
            if ok && pos - i + 1 < best_len {
                best_len = pos - i + 1;
                best_start = i;
                // |s2| is the unavoidable lower bound
                if best_len == m {
                    break;
                }
            }
        }
        if best_start == usize::MAX {
            String::new()
        } else {
            String::from_utf8(s1[best_start..best_start + best_len].to_vec()).expect("window bytes")
        }
    }
}
