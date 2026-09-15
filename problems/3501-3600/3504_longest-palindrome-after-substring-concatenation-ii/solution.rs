impl Solution {
    pub fn longest_palindrome(s: String, t: String) -> i32 {
        let s = s.as_bytes();
        let t = t.as_bytes();
        let n = s.len();
        let m = t.len();
        // p[i] = longest palindrome starting at s[i]; a rolling interval
        // table fills every row bottom-up in O(n^2) time and O(n) space.
        let mut p = vec![1usize; n];
        let mut below = vec![false; n + 1];
        for i in (0..n).rev() {
            let mut row = vec![false; n + 1];
            row[i] = true;
            let mut best = 1usize;
            for j in i + 1..n {
                row[j] = s[i] == s[j] && (j == i + 1 || below[j - 1]);
                if row[j] {
                    best = j - i + 1;
                }
            }
            p[i] = best;
            below = row;
        }
        // q[j] = longest palindrome ending at t[j]; the same fill records
        // the longest length per right end.
        let mut q = vec![1usize; m];
        below = vec![false; m + 1];
        for i in (0..m).rev() {
            let mut row = vec![false; m + 1];
            row[i] = true;
            for j in i + 1..m {
                row[j] = t[i] == t[j] && (j == i + 1 || below[j - 1]);
                if row[j] {
                    q[j] = j - i + 1;
                }
            }
            below = row;
        }
        let mut best = 0usize;
        for &v in &p {
            if v > best {
                best = v;
            }
        }
        for &v in &q {
            if v > best {
                best = v;
            }
        }
        // dp[i][j] = longest palindrome starting with s[i] and ending with
        // t[j]. Each cell needs only dp[i+1][j-1], its neighbour on the
        // diagonal i + j, so one scalar walks each diagonal inward. At the
        // table edge the missing neighbour becomes p[i+1] (no t-part left) or
        // q[j-1] (no s-part left).
        for d in 0..n + m - 1 {
            let i_hi = if d < n { d } else { n - 1 };
            let i_lo = (d + 1).saturating_sub(m);
            let j_hi = d - i_hi;
            let mut nxt = 0usize;
            if i_hi < n - 1 {
                nxt = p[i_hi + 1];
            } else if j_hi > 0 {
                nxt = q[j_hi - 1];
            }
            for i in (i_lo..=i_hi).rev() {
                let j = d - i;
                let mut cur = p[i].max(q[j]);
                if s[i] == t[j] {
                    let add = nxt + 2;
                    if add > cur {
                        cur = add;
                    }
                }
                if cur > best {
                    best = cur;
                }
                nxt = cur;
            }
        }
        best as i32
    }
}
