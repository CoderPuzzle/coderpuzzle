impl Solution {
    pub fn can_make_subsequence(s: String, t: String) -> bool {
        let s: Vec<char> = s.chars().collect();
        let t: Vec<char> = t.chars().collect();
        let m = s.len();
        let n = t.len();
        let mut pref = vec![n + 1; m + 1];
        pref[0] = 0;
        for i in 0..m {
            let mut j = pref[i];
            while j < n && s[i] != t[j] {
                j += 1;
            }
            pref[i + 1] = if j < n { j + 1 } else { n + 1 };
        }
        if pref[m] <= n {
            return true;
        }

        let mut suf = vec![usize::MAX; m + 1];
        suf[m] = n;
        for i in (0..m).rev() {
            if suf[i + 1] == usize::MAX {
                continue;
            }
            let mut j = suf[i + 1];
            while j > 0 && s[i] != t[j - 1] {
                j -= 1;
            }
            suf[i] = if j > 0 { j - 1 } else { usize::MAX };
        }

        (0..m).any(|i| suf[i + 1] != usize::MAX && pref[i] < suf[i + 1])
    }
}
