impl Solution {
    pub fn is_match(s: String, p: String) -> bool {
        // Greedy two pointers with one remembered star: every '*' is first
        // matched to the empty run, and a later mismatch backtracks to the
        // most recent star and lets it absorb one more character of s.
        let (s, p) = (s.as_bytes(), p.as_bytes());
        let (n, m) = (s.len(), p.len());
        let (mut si, mut pi) = (0usize, 0usize);
        let mut star: Option<usize> = None;
        let mut restart = 0usize;
        while si < n {
            if pi < m && (p[pi] == b'?' || p[pi] == s[si]) {
                si += 1;
                pi += 1;
            } else if pi < m && p[pi] == b'*' {
                // Provisional choice: the star matches nothing yet.
                star = Some(pi);
                restart = si;
                pi += 1;
            } else if let Some(star_at) = star {
                // Mismatch after a star: the star absorbs one more character
                // of s, and the pattern replays from just after it.
                restart += 1;
                si = restart;
                pi = star_at + 1;
            } else {
                return false;
            }
        }
        // Only trailing stars can still match the empty remainder of s.
        while pi < m && p[pi] == b'*' {
            pi += 1;
        }
        pi == m
    }
}
