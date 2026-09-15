impl Solution {
    pub fn longest_palindrome(s: String, t: String) -> i32 {
        let s = s.as_bytes();
        let t = t.as_bytes();
        let n = s.len();
        let m = t.len();
        // palS[i][j] (palT[i][j]) records whether s[i..j] (t[i..j]) is a
        // palindrome; the tables also give single-string answers, since
        // either substring may be empty. Padding rows keep the below-row in
        // bounds.
        let mut pal_s = vec![vec![false; n + 1]; n + 1];
        let mut best = 0usize;
        for i in (0..n).rev() {
            pal_s[i][i] = true;
            for j in i + 1..n {
                pal_s[i][j] = s[i] == s[j] && (j == i + 1 || pal_s[i + 1][j - 1]);
            }
            for j in (i..n).rev() {
                if pal_s[i][j] {
                    best = best.max(j - i + 1);
                    break;
                }
            }
        }
        let mut pal_t = vec![vec![false; m + 1]; m + 1];
        for i in (0..m).rev() {
            pal_t[i][i] = true;
            for j in i + 1..m {
                pal_t[i][j] = t[i] == t[j] && (j == i + 1 || pal_t[i + 1][j - 1]);
            }
            for j in (i..m).rev() {
                if pal_t[i][j] {
                    best = best.max(j - i + 1);
                    break;
                }
            }
        }
        // Enumerate every pair of non-empty substrings. The concatenation
        // s[i..i2] + t[j..j2] is a palindrome iff the shorter side mirrors
        // the longer one and the leftover piece is itself a palindrome.
        for i in 0..n {
            for i2 in i..n {
                let la = i2 - i + 1;
                for j in 0..m {
                    for j2 in j..m {
                        let lb = j2 - j + 1;
                        if la + lb <= best {
                            continue;
                        }
                        let limit = la.min(lb);
                        let mut ok = true;
                        for k in 0..limit {
                            if s[i + k] != t[j2 - k] {
                                ok = false;
                                break;
                            }
                        }
                        if !ok {
                            continue;
                        }
                        if la == lb {
                            best = la + lb;
                        } else if la > lb && pal_s[i + lb][i2] {
                            best = la + lb;
                        } else if la < lb && pal_t[j][j2 - la] {
                            best = la + lb;
                        }
                    }
                }
            }
        }
        best as i32
    }
}
